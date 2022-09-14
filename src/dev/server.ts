import Fastify from "fastify"
import Websocket from "@fastify/websocket";

import type { ChildProcessWithoutNullStreams } from "node:child_process";
import type { SocketStream } from "@fastify/websocket"
import type { FastifyRequest, FastifyInstance } from "fastify"
import * as WebSocket from 'ws';

import { homePageHandler } from './homePageHandler';
import { templateHandler } from "./templateHandler";
import { websocketClientHandler } from "./websocketClientHandler";

interface ServerOptions {
  tsc: ChildProcessWithoutNullStreams
}

export const startServer = async ({ tsc }: ServerOptions) => {

  const app = Fastify({ logger: true });

  app.register(Websocket)
  app.register(WebsocketServer)

  app.get('/', homePageHandler)
  app.get('/template/*', templateHandler)
  app.get('/src/dev/websocketclient.ts', websocketClientHandler("../../src/dev/websocketclient.ts"))
  app.get('/websocketclient.js', websocketClientHandler("./websocketclient.js"))
  app.get('/websocketclient.js.map', websocketClientHandler("./websocketclient.js.map"))

  app.listen({ port: 3000 })

  return () => app.close()

}


const sockets: WebSocket[] = []

export const WebsocketServer = async function (fastify: FastifyInstance) {

  fastify.get('/ws', { websocket: true }, (connection, req) => {

    sockets.push(connection.socket);

    connection.socket.send('hello buddy')

  })

};