# Dashboard

### Install

```bash
$ npm install
```

### Build and run server

```bash
$ npm run build:server
$ node build/server.js
```

### Build server experimental by SWC

```bash
$ npm run build:mserver
$ node --experimental-specifier-resolution=node build/server.mjs
```

### Start development

```bash
$ npm run dev
```

### How to work with DB

There are records of nodes.

```bash
$ docker exec -it backend_mysql_1 mysql -u root -pqwerty stock -e 'select hex(id),`type`,entity from entities\G';
```

There are records of edges.

```bash
$ docker exec -it backend_mysql_1 mysql -u root -pqwerty stock -e 'select hex(subject),predicate,hex(object) from triples\G';
```
