const crypto = require("crypto");

const {
  create,
  getAll,
  getById,
  updateById,
  removeById,
} = require("../model/users.model");
const {
  handleAdd,
  handleGet,
  handleList,
  handleUpdate,
  handleDelete,
} = require("../util/success_handler.util");

const ERRORS = require("../util/errors.util");
const { createHash } = require("../util/crypto.util");
const { ServiceError, ResourceNotFoundError } = ERRORS;

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description Get list of users by specified parameters offset and limit
 */
const getUsers = (req, res, next) => {
  const { offset = 0, limit = 10 } = req.query;
  const users = getAll({ offset: Number(offset), limit: Number(limit) });
  return handleList(res, next, users);
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description Get user by specifying id
 */
const getUserById = (req, res, next) => {
  const id = req.params[0];
  const user = getById(id);
  return handleGet(res, next, user);
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description Create user with properties
 */
const createUser = (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = JSON.parse(req.body);

    const userId = crypto.randomUUID();
    const hashedPassword = createHash(password, userId);

    const user = create({
      id: userId,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return handleAdd(res, next, user);
  } catch (err) {
    next(new ServiceError(err));
  }
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description Update user with id and properties
 */
const updateUserById = (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = JSON.parse(req.body);
    const id = req.params[0];

    const existingUser = getById(id);
    if (!existingUser) {
      return next(
        new ResourceNotFoundError(`The user with id: ${id} is not found`)
      );
    }

    const data = {
      first_name: first_name || existingUser.first_name,
      last_name: last_name || existingUser.last_name,
      email: email || existingUser.email,
      password: (password && createHash(password, id)) || existingUser.password,
    };

    const updatedUser = updateById(id, data);

    return handleUpdate(res, next, updatedUser);
  } catch (err) {
    next(new ServiceError(err));
  }
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description Remove user with id
 */
const removeUserById = (req, res, next) => {
  try {
    const id = req.params[0];
    const user = getById(id);
    if (!user) {
      return next(
        new ResourceNotFoundError(`The user with id: ${id} is not found`)
      );
    }
    removeById(id);

    return handleDelete(res, next);
  } catch (err) {
    next(new ServiceError(err));
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
};
