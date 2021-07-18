const pg = require("pg");
const Client = pg.Client;

const dbServers = require("./db_servers");
if (!dbServers.length)
  console.log("Warning : Add db server configs and ssl certificates");

const servers = {};
dbServers.forEach((server) => {
  const { serverName, config } = server;
  servers[serverName] = new Client(config);
});

connect();
async function connect() {
  Object.keys(servers).forEach(
    async (server) => await servers[server].connect()
  );
}

module.exports = { servers };
