// src/controllers/user/index.j
const { createUserController } = require('./create.controller');
const { getUserByIdController } = require('./getById.controller');
const { updateUserController } = require('./update.controller');
const { deleteUserController } = require('./delete.controller');

module.exports = {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};