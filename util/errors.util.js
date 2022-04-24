const ERRORS_NAME = [
  "InputValidationError",
  "ResourceNotFoundError",
  "RequestTooLongError",
  "ServiceError"
];

const ERRORS = ERRORS_NAME.reduce((acc, className) => {
  acc[className] = {
    [className]: class extends Error {
      constructor(msg, type, status) {
        super();
        this.message = msg;
        type && (this.type = type);
        this.status = status;
        this.name = this.constructor.name;
      }
    },
  }[className];

  return acc;
}, {});

module.exports = ERRORS;
