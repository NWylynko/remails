
const mainTemplateWS = () => {
  const ws = new WebSocket('ws://localhost:3000/ws');

  ws.onmessage = (event => {
    window.location.reload();
  })
}

mainTemplateWS();