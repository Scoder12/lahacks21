# Backend

Running:

In one terminal:

```bash
yarn watch
```

In another:

```bash
source .env.development && yarn dev
```

To spin up postgres:

```bash
docker run --rm --name lahacks_db -e POSTGRES_PASSWORD=abcd -p 127.0.0.1:5432:5432 -d postgres
```

To spin up redis:

```bash
docker run --rm --name lahacks_redis -p 127.0.0.1:6379:6379 -d redis
```
