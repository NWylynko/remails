import { FastifyInstance } from "fastify";
import * as WebSocket from 'ws';
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { getTemplateFiles } from "../getTemplates";

const sockets: WebSocket[] = []

interface WebsocketServerOptions {
  tsc: ChildProcessWithoutNullStreams
}

export const WebsocketServer = ({ tsc }: WebsocketServerOptions) => async function (fastify: FastifyInstance) {

  fastify.get('/ws', { websocket: true }, (connection, req) => {

    sockets.push(connection.socket);

    // connection.socket.send('hello buddy');

  });

  // additionally we listen for when its ready to run
  tsc.stdout.on("data", async (_message) => {

    const message = _message.toString()

    // when this is printed to terminal it means its done compiling
    if (message.includes(`Watching for file changes.`)) {

      // we need a list of the templates
      const templateFiles = await getTemplateFiles(".remails/templates")
      const templates = templateFiles.map(({ name }) => name);

      // send this on websocket to tell client the list of templates
      // console.log({ templates })

      sockets.map((socket) => socket.send(JSON.stringify(templates)))


    }

  })

};
