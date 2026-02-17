const { createAttendanceRepository } = require("./attendance.repository");
const { createAttendanceService } = require("./attendance.service");
const { createAttendanceController } = require("./attendance.controller");

function initAttendance(knex) {
  const repository = createAttendanceRepository(knex);
  const service = createAttendanceService(repository);
  const controller = createAttendanceController(service);

  return controller;
}

module.exports = { initAttendance };
