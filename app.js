const express = require('express');
const session = require('express-session');
const knex = require('./db/knex');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { makeHashedPW } = require('.//utils/makepw');

const { initUser } = require('./src/user/index');
const { initAttendance } = require('./src/attendance/index');
const { authMiddleware } = require('./src/middleware/auth');

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // セッション設定
  app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: false,
      },
    })
  );

  app.use(authMiddleware); // リクエストにuser_idをつけくわえた状態で、全エンドポイント実行

  // OpenAPI ドキュメント設定
  const openApiPath = './openapi.yaml';
  const swaggerDocument = YAML.load(openApiPath);

  // Swagger UI を /api-docs エンドポイント で公開
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        url: '/openapi.yaml',
      },
    })
  );

  // openapi.yaml を静的ファイルで公開
  app.get('/openapi.yaml', (req, res) => {
    res.sendFile(openApiPath);
  });

  const userController = initUser(knex);
  const attendanceController = initAttendance(knex);

  function validateIdMiddleware(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: `パラメータが不正です。Received: "${req.params.id}", typeof: "${typeof req.params.id}"`,
      });
    }
    next();
  }

  // ログイン
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({ message: '認証失敗' });
    }

    const hashed = makeHashedPW(user.salt, password);
    if (hashed === user.password_hash) {
      req.session.user = { id: user.id, name: user.name };
      return res.json({
        message: 'ログイン成功',
        user: { id: user.id, name: user.name },
      });
    }

    res.status(401).json({ message: '認証失敗' });
  });

  // 認証チェック
  app.get('/api/me', (req, res) => {
    if (req.session.user) {
      return res.json({ loggedIn: true, user: req.session.user });
    }
    res.status(401).json({ loggedIn: false });
  });

  // ログアウト
  app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ message: 'ログアウトしました' });
    });
  });

  app.get('/api/users', userController.list);
  app.get('/api/users/:id', validateIdMiddleware, userController.find);

  app.get('/api/attendances', attendanceController.list);
  app.get(
    '/api/attendances/:id',
    validateIdMiddleware,
    attendanceController.find
  );
  app.post('/api/attendances/clock-in', attendanceController.clockIn);
  app.post('/api/attendances/clock-out', attendanceController.clockOut);
  app.patch(
    '/api/attendances/:id',
    validateIdMiddleware,
    attendanceController.update
  );

  // API用の404ハンドラーに変更
  app.use('/api/*', (req, res) =>
    res.status(404).json({ error: 'API Not Found' })
  );

  return app;
}

module.exports = { buildApp };
