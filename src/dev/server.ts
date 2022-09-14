import Websocket from "@fastify/websocket";
import Fastify from "fastify";

import type { ChildProcessWithoutNullStreams } from "node:child_process";

import { homePageHandler } from './homePageHandler';
import { templateHandler } from "./templateHandler";
import { websocketClientHandler } from "./websocketClientHandler";
import { WebsocketServer } from "./WebsocketServer";

interface ServerOptions {
  tsc: ChildProcessWithoutNullStreams
}

export const startServer = async ({ tsc }: ServerOptions) => {

  const app = Fastify({ logger: true });

  app.register(Websocket)
  app.register(WebsocketServer({ tsc }))

  app.get('/', homePageHandler)

  app.get('/websocketclient.js', websocketClientHandler("./websocketclient.js"))
  app.get('/websocketclient.js.map', websocketClientHandler("./websocketclient.js.map"))
  app.get('/src/dev/websocketclient.ts', websocketClientHandler("../../src/dev/websocketclient.ts"))

  app.get('/template/*', templateHandler)

  app.get('/websocketclientTemplate.js', websocketClientHandler("./websocketclientTemplate.js"))
  app.get('/websocketclientTemplate.js.map', websocketClientHandler("./websocketclientTemplate.js.map"))
  app.get('/src/dev/websocketclientTemplate.ts', websocketClientHandler("../../src/dev/websocketclientTemplate.ts"))

  app.listen({ port: 3000 })

  return () => app.close()

}
