
const mainHomePageWS = () => {
  const ws = new WebSocket('ws://localhost:3000/ws');

  // console.log(ws)

  // ws.onopen = (event => {
  //   console.log(`websocket connection opened`, event)
  // })

  const listElement = document.getElementById("templates-list");

  ws.onmessage = (event => {
    const list = JSON.parse(event.data) as string[]

    while (listElement?.lastChild) {
      listElement.removeChild(listElement.lastChild);
    }

    for (const name of list) {

      const link = document.createElement('a')
      link.href = `/template/${name}`
      link.innerText = name;
      link.style["color"] = "black";

      const listItem = document.createElement('li')
      listItem.appendChild(link)

      listElement?.appendChild(listItem);
    }
  })
}

mainHomePageWS();