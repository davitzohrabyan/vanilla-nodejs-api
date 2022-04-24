const ErrorHandlerMiddleware = require("./middleware/error_handler.middleware");
const {
  destructBody,
  destructParams,
  destructQuery,
} = require("./middleware/destruct_request.middleware");
const ERRORS = require("./util/errors.util");
const { ResourceNotFoundError } = ERRORS;

const routes = require("./routes");

class App {
  static middlewares = [];

  /**
   * @constructor
   */
  constructor() {
    this.port = "3000";
    this.use = function use(fn) {
      App.middlewares.push(fn);
      return this;
    };
  }

  /**
   * @description Initialize the App.
   */
  init() {
    try {
      this._setRouteMiddlewares();
      this._setRequestParams();
      this._startRoute();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @param {any} args
   * @description Create middleware logic to run functions with next
   */
  createApp(...args) {
    let i = 0;
    const next = () => {
      args.push(next);
      App.middlewares[i++].apply(this, args);
    };
    next();
  }

  /**
   * @private
   * @description Find and set route middleware functions:
   */
  _setRouteMiddlewares() {
    this.use((req, _res, next) => {
      const baseURL = req.protocol || "http" + "://" + req.headers.host + "/";
      req.urlParams = new URL(req.url, baseURL);

      req.route = routes.find((route) =>
        route.pattern.test(req.urlParams.pathname)
      );

      req.middlewares = req.route?.[req.method];
      if (!req.middlewares) {
        return next(new ResourceNotFoundError("Route not found"));
      }
      next();
    });
  }

  /**
   * @private
   * @description Destruct request and set body and query params:
   */
  _setRequestParams() {
    this.use((req, res, next) => {
      destructBody(req, res, next);
      destructQuery(req, res, next);
      destructParams(req, res, next);
    });
  }

  /**
   * @private
   * @description Start middleware functions for route:
   */
  _startRoute() {
    this.use(this._initRoutes);
  }

    /**
   * @private
   * @description Init routes with "next" functional
   */
  _initRoutes(req, res) {
    let i = 0;
    const next = (err) => {
      if (err) return ErrorHandlerMiddleware.init(err, req, res);
      const middleware = req.middlewares[i++];
      middleware.apply(this, [req, res, next]);
    };
  
    next();
  }
}

module.exports = new App();
