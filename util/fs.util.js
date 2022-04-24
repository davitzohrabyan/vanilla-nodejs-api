const fs = require("fs");
const path = require("path");

/**
 * @param {string} filename
 * @param {Object} data
 *  @return {Boolean}
 * @description Writes data to specified file
 */
function writeToFile(filename, data) {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8", (error) => {
    return !!error;
  });
}

module.exports = {
  writeToFile,
};
