const { ResourceNotFoundError } = require("./errors.util");

const HttpStatusCodesUtil = require("./http_status_codes.util");

/**
 * @param {Object} res
 * @param {number} status
 * @param {Object} data
 * @description Send response.
 */
function _sendResponse(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

/**
 * @param {Object} res
 * @param {Function} next
 * @param {Array} result
 * @description Handle `list` type requests.
 */
function handleList(res, _next, result) {
  _sendResponse(res, HttpStatusCodesUtil.OK, result);
}

/**
 * @param {Object} res
 * @param {Function} next
 * @param {Object} result
 * @description Handle 'add' type requests.
 */
function handleAdd(res, _next, result) {
  if (!result) {
    return _sendResponse(res, HttpStatusCodesUtil.NO_CONTENT);
  }

  _sendResponse(res, HttpStatusCodesUtil.CREATED, result);
}

/**
 * @param {Object} res
 * @param {Function} next
 * @param {Object} result
 * @description Handle `get` type requests.
 */
function handleGet(res, next, result) {
  if (!result) {
    return next(
      new ResourceNotFoundError("The specified resource is not found.")
    );
  }

  _sendResponse(res, HttpStatusCodesUtil.OK, result);
}

/**
 * @param {Object} res
 * @param {Function} next
 * @param {Object} result
 * @description Handle `update` type requests.
 */
function handleUpdate(res, _next, result) {
  if (!result) {
    return _sendResponse(res, HttpStatusCodesUtil.NO_CONTENT);
  }

  _sendResponse(res, HttpStatusCodesUtil.OK, result);
}

/**
 * @param {Object} res
 * @param {Function} next
 * @description Handle `delete` type requests.
 */
function handleDelete(res, _next) {
  _sendResponse(res, HttpStatusCodesUtil.NO_CONTENT);
}

module.exports = {
  handleAdd,
  handleGet,
  handleList,
  handleUpdate,
  handleDelete,
};
