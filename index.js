const http = require("http");

const App = require("./app.js");

const { name, engines } = require("./package.json");

async function init() {
  App.init();

  /**
   * @description Create HTTP server.
   */
  const server = http.createServer(App.createApp);

  /**
   * @private
   * @param error
   * @description Event listener for HTTP/HTTPS server "error" event.
   */
  function _onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind =
      typeof App.port === "string" ? `Pipe ${App.port}` : `Port ${App.port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
  }

  /**
   * @private
   * @description Event listener for HTTP/HTTPS server "listening" event.
   */
  function _onListening() {
    const address = server.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `${address.port}`;

    console.info(`${name} started:`);
    console.info(`\tPort: ${bind}`);
    console.info(
      `\tNode version: ${process.version}. Recommended v${engines.node}`
    );
    console.info(`\tStart date: ${new Date().toUTCString()} \n`);
  }

  /**
   * @description Listen.
   */
  server.listen(App.port);
  server.on("error", _onError);
  server.on("listening", _onListening);
}

module.exports = init().catch(console.error);
