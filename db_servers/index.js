const fs = require("fs");
const path = require("path");

const files = [];
const basename = path.basename(__filename);
const configsFolder = path.join(__dirname, "db_configs1");

//Getting all the config files dynamically
try {
  fs.readdirSync(configsFolder)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-4) === ".txt"
    )
    .forEach((file) => {
      const filePath = path.join(configsFolder, file);

      const content = fs.readFileSync(filePath).toString();
      const allLines = content.split("\n");
      const serverName = file.slice(0, -4);
      const config = {};
      allLines.forEach((line) => {
        const data = line.split(" ");
        config[data[0]] = data[2];
      });
      const sslFile = path.join(
        __dirname,
        `./db_ssl_certificates/${serverName}.crt`
      );
      const ssl = {
        ca: fs.readFileSync(sslFile).toString(),
      };
      config["ssl"] = ssl;
      config["user"] = config["username"];
      delete config["username"];
      delete config["sslmode"];
      // const testCaseData = require(filePath);
      const server = { serverName, config };
      files.push(server);
    });
} catch (err) {}

module.exports = files;
