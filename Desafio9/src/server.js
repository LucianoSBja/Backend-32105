import app from "./app.js";
//! WEBSOCKETS
import { Server as WebSocketServer } from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = new WebSocketServer(server);
//! DATABASE
import MySQLConn from "./DB/mysql/connection.js";
// import SQLiteConn from "./DB/sqlite/connection.js"
//! CONTENEDOR PRODUCTOS
import Container from "./models/Container.js";
const DBprod = new Container(MySQLConn, "Products");
//! CONTENEDOR MENSAJES
import Messages from "./models/Chat.js";
const DBmsg = new Messages("chat");
//! STARTING SERVER

server.listen(app.get("port"), () => {
  console.log(`Express Server connected on port ${app.get("port")}`);
});

//! ERROR HANDLER

server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});

io.on("connection", async (socket) => {
  //! Nueva conexión
  console.log(`New Connection: ${socket.id}`);

  //! PRODUCTOS

  const products = await DBprod.getAll();
  socket.emit("product:all", products);

  //! Guardar producto
  socket.on("product:new", async (object) => {
    const data = await DBprod.save(object);
    const products = await DBprod.getAll();
    data === null
      ? socket.emit("product:submit", { product: object, status: true })
      : socket.emit("product:submit", { product: object, status: false });
    io.sockets.emit("product:all", products);
  });

  //! CHAT

  //! El evento chat:messages iniciará enviando el array existente al cliente
  const allMessages = await DBmsg.readMessages();
  socket.emit("chat:history", allMessages);

  //! Se escucha el evento chat:message, se guarda el mensaje recibido por el cliente y se emite un mensaje general con el array Messages actualizado a todos los sockets conectados y por conectarse

  socket.on("chat:message", async (data) => {
    const allMessages = await DBmsg.saveMessage(data);
    io.sockets.emit("chat:history", allMessages);
  });

  //! Se escucha el evento chat:typing y se emite un mensaje a todos los sockets conectados, excepto al que "está escribiendo..." con el método broadcast

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
