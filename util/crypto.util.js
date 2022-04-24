const crypto = require("crypto");

/**
 * @param {string} password
 * @param {string} salt
 *  @return {string}
 * @description Creates hash password from a given string and salt.
 */
function createHash(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

module.exports = {
  createHash,
};
