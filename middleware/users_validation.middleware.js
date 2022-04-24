const ERRORS = require("../util/errors.util");
const { InputValidationError } = ERRORS;

const requiredFields = ["first_name", "last_name", "email", "password"];
const emailPattern = /\S+@\S+\.\S+/;

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Validate user creation arguments
 */
const validateCreateUser = (req, _res, next) => {
  const dataToValidate = JSON.parse(req.body);
  const missingFields = requiredFields.filter(
    (key) => !Object.keys(dataToValidate).includes(key)
  );

  if (missingFields.length) {
    return next(
      new InputValidationError(
        `Missing properties: ${missingFields.join(", ")}`
      )
    );
  }
  if (!emailPattern.test(dataToValidate.email)) {
    return next(new InputValidationError("Wrong email pattern"));
  }

  if (dataToValidate.password.length < 6) {
    return next(
      new InputValidationError(
        "Password must have at least 6 characters length"
      )
    );
  }
  next();
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Validate user updating arguments
 */
const validateUpdateUser = (req, _res, next) => {
  const dataToValidate = JSON.parse(req.body);
  const id = req.params[0];
  if (!id) {
    return next(new InputValidationError("The id is required"));
  }
  if (dataToValidate.email && !emailPattern.test(dataToValidate.email)) {
    return next(new InputValidationError("Wrong email pattern"));
  }
  if (dataToValidate.password && dataToValidate.password.length < 6) {
    return next(
      new InputValidationError(
        "Password must have at least 6 characters length"
      )
    );
  }
  next();
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Validate users list getting arguments
 */
const validateGetUsers = (req, _res, next) => {
  const { offset, limit } = req.query;
  if (offset && isNaN(offset)) {
    return next(
      new InputValidationError(
        `The offset must be an integer number, received: ${offset}`
      )
    );
  }
  if (limit && isNaN(limit)) {
    return next(
      new InputValidationError(
        `The limit must be an integer number, received: ${limit}`
      )
    );
  }
  next();
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Validate getting user by id arguments
 */
const validateGetUserById = (req, _res, next) => {
  const id = req.params[0];
  if (!id) {
    return next(new InputValidationError("The id is required"));
  }
  next();
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Validate user removal arguments
 */
const validateRemoveUser = (req, _res, next) => {
  const id = req.params[0];
  if (!id) {
    return next(new InputValidationError("The id is required"));
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateGetUsers,
  validateGetUserById,
  validateUpdateUser,
  validateRemoveUser,
};
