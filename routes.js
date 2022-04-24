const {
  validateCreateUser,
  validateGetUsers,
  validateGetUserById,
  validateUpdateUser,
  validateRemoveUser,
} = require("./middleware/users_validation.middleware");
const {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
} = require("./service/users.service");

const routes = [
  {
    pattern: /^\/users\/?$/,
    GET: [validateGetUsers, getUsers],
    POST: [validateCreateUser, createUser],
  },
  {
    pattern: /^\/users\/[\S]{1,}$/,
    GET: [validateGetUserById, getUserById],
    PATCH: [validateUpdateUser, updateUserById],
    DELETE: [validateRemoveUser, removeUserById],
  },
];

module.exports = routes;
