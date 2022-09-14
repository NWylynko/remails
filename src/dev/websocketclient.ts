
const ws = new WebSocket('ws://localhost:3000/ws');

console.log(ws)

ws.onopen = (event => {
  console.log(`websocket connection opened`, event)
  ws.send("Here's some text that the server is urgently awaiting!");

})

ws.onmessage = (event => {
  console.log(`recieved message from server`, event)
})