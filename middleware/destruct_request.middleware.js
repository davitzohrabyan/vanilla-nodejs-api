/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Get data from request, store it in request body
 */
const destructBody = (req, _res, next) => {
  req.body = "";
  req.on("data", (bufferData) => {
    req.body += bufferData.toString();
  });
  req.on("end", () => {
    next();
  });
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Get query params from request, store it in request.query
 */
const destructQuery = (req, _res, _next) => {
  req.query = Object.fromEntries(new URLSearchParams(req.urlParams.search));
};

/**
 * @param {Object} req
 * @param {Object} _res
 * @param {Function} next
 * @description Get params from request, store it in request.params
 */
const destructParams = (req, _res, _next) => {
  req.params = req.urlParams.pathname.split("/").slice(2);
};

module.exports = {
  destructBody,
  destructParams,
  destructQuery,
};
