import fastify from "fastify";
import mercurius from "mercurius";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const app = fastify();

app.get("/", async () => {
  return "Hello, world!";
});

async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  app.register(mercurius, { schema });

  app.listen(8080, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

if (require.main === module) main();
