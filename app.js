const express = require('express');
const knex = require('./db/knex');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const { initUser } = require('./src/user/index');
const { initAttendance } = require('./src/attendance/index');
const { authMiddleware } = require('./src/middleware/auth');

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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

  app.get('/users', userController.list);
  app.get('/users/:id', validateIdMiddleware, userController.find);

  app.get('/attendances', attendanceController.list);
  app.get('/attendances/:id', validateIdMiddleware, attendanceController.find);
  app.post('/attendances/clock-in', attendanceController.clockIn);
  app.post('/attendances/clock-out', attendanceController.clockOut);
  app.patch(
    '/attendances/:id',
    validateIdMiddleware,
    attendanceController.update
  );

  app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

  return app;
}

module.exports = { buildApp };
