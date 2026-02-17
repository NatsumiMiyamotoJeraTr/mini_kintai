const { createUserRepository } = require("./user.repository");
const { createUserService } = require("./user.service");
const { createUserController } = require("./user.controller");

function initUser(knex) {
  const repository = createUserRepository(knex);
  const service = createUserService(repository);
  const controller = createUserController(service);

  return controller;
}

module.exports = { initUser };
