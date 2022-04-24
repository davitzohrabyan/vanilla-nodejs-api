const http = require("http");

const HttpStatusCodesUtil = require("../util/http_status_codes.util");

const ERROR_CASES = {
  InputValidationError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
  },
  ResourceNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND],
  },
  DEFAULT: {
    status: HttpStatusCodesUtil.INTERNAL_SERVER_ERROR,
    code: http.STATUS_CODES[HttpStatusCodesUtil.INTERNAL_SERVER_ERROR],
    message: "The server encountered an internal error. Try again later.",
  },
};

/**
 * @param {Object} error
 * @param {Object} _req
 * @param {Object} res
 * @param {Function} _next
 * @description Initialize error handler.
 */
function init(error, _req, res) {
  const ERROR_CASE =
    ERROR_CASES[error.status] ||
    ERROR_CASES[error.code] ||
    ERROR_CASES[error.name] ||
    ERROR_CASES.DEFAULT;

  const { status, code, message } = ERROR_CASE;

  const result = {
    status,
    code,
    message: message || error.message,
    data: error.data,
  };
  error.type && (result.type = error.type);

  result.status === 500 &&
    console.error("Case: ", error.status, error.code, error.name, error.message);

  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
}

module.exports = {
  init,
  ERROR_CASES,
};
