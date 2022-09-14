import Fastify from "fastify"

import { homePageHandler } from './homePageHandler';
import { templateHandler } from "./templateHandler";

export const startServer = async () => {

  const app = Fastify({ logger: true });

  app.get('/', homePageHandler)
  app.get('/template/*', templateHandler)

  app.listen({ port: 3000 })

  return () => app.close()

}
