const { writeToFile } = require("../util/fs.util");
let users = require("../data/users.json");

/**
 * @param {Object} query
 * @description Get users by given query parameters
 *  @return {Array}
 */
function getAll(query) {
  const { offset, limit } = query;
  return users.slice(offset, offset + limit);
}

/**
 * @param {String} id
 * @description Get user by id parameter
 * @return {Object}
 */
function getById(id) {
  return users.find((user) => user.id === id);
}

/**
 * @param {Object} user
 * @description Create user by user object
 * @return {Object}
 */
function create(user) {
  users.push(user);
  writeToFile("../data/users.json", users);
  return user;
}

/**
 * @param {String} id
 * @param {Object} user
 * @description Update user by id and user object
 * @return {Object}
 */
function updateById(id, user) {
  const index = users.findIndex((user) => user.id === id);
  users[index] = { id, ...user };
  writeToFile("../data/users.json", users);
  return users[index];
}

/**
 * @param {String} id
 * @description Remove user by id
 */
function removeById(id) {
  users = users.filter((user) => user.id !== id);
  writeToFile("../data/users.json", users);
  return;
}

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  removeById,
};
