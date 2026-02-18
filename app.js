const express = require('express');
const knex = require('./knex');

const { initUser } = require('./user/index');
const { initAttendance } = require('./attendance/index');

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
  app.post('/attendances/clock-in', attendanceController.create);
  app.post('/attendances/clock-out', attendanceController.create);
  app.patch(
    '/attendances/:id',
    validateIdMiddleware,
    attendanceController.update
  );

  app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

  return app;
}

module.exports = { buildApp };
