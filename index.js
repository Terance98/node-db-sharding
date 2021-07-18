const app = require("express")();
const crypto = require("crypto");
const { servers } = require("./db") || {};
const { hr } = require("./hashring");

app.get("/", (req, res) => {
  return res.send("Pass in a /:urlId to redirect to the actual url");
});

app.post("/", async (req, res) => {
  const url = req.query.url;

  //consistently hash this to get a port!  eg: www.wikipedia.com/sharding
  const hash = crypto.createHash("sha256").update(url).digest("base64");
  const urlId = hash.substr(0, 5);

  /**
   * Example urls to get the different sharded servers
   * https://wikipedia.com/random5  => 5437
   * https://wikipedia.com/random4  => 5435
   * https://wikipedia.com/random6  => 5436
   */

  const server = hr.get(urlId);
  console.log("Using shard server : ", server);

  const client = servers[server];

  const query = `insert into url_table(url, url_id) values ('${url}', '${urlId}')`;
  await client.query(query);

  return res.send({
    urlId,
    url,
    server,
  });
});

app.get("/:urlId", async (req, res) => {
  const urlId = req.params.urlId;

  const server = hr.get(urlId);
  console.log("Using shard server : ", server);

  const client = servers[server];

  const query = `select * from url_table where url_id = '${urlId}'`;
  const data = await client.query(query).then((data) => data.rows[0]);

  if (!data || !data.url) return res.redirect("/");

  return res.redirect(data && data.url);
});

app.listen(8081, () => console.log("listening on 8081"));
