const { servers } = require("./db") || {};
const HashRing = require("hashring");

//hr stands for hash ring
const hr = new HashRing();

//Adding each of the sever to the hash ring
Object.keys(servers).forEach((server) => hr.add(server));

module.exports = { hr };
