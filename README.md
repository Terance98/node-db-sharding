# node-db-sharding

- A sample respository to test out DB Sharding in Postgres 13 with node.js

## How to run ?

- Add 2 folders in db_servers namely db_configs and db_ssl_certificates
- Add server1.txt in db_servers
- Sample data for server1.txt is given below
- Add server1.crt file in db_ssl_certificates.
- Each server config file added, add the corresponding certificate with the same file name

## Different Method

- Here it is run with some postgres instances
- We can also use the given docker file to create some local postgres instances and use those instead
- Only the config files need to be updated accordingly

## Sample server1.txt content

```
username = test
password = test
host = test-url.com
port = 5432
database = db
sslmode = require
```
