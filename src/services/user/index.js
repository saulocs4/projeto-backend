
const { createUser } = require('./create.service');
const { getUserById } = require('./getById.service');
const { updateUser } = require('./update.service');
const { deleteUser } = require('./delete.service');

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};