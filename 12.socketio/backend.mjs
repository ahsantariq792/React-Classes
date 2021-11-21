import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
const PORT = process.env.PORT || 5000

let app = express()
// app.use(cors())


app.get("/", (req, res, next) => {
    res.send("ping");
})

// THIS IS THE ACTUAL SERVER WHICH IS RUNNING
//instead of app.listen we use 
const server = createServer(app);

//io contains details of all users connected
// handing over server access to socket.io
const io = new Server(server, { cors: { origin: "*", methods: "*", } });

    
io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    // collecting connected users in a array
    // connectedUsers.push(socket)

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


// to emit data to a certain client
//  connectedUsers[0].emit("topic 1", "some data")

setInterval(() => {

    // to emit data to all connected client
    // first param is topic name and second is json data
    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
    console.log("emiting data to all client");

}, 2000)

server.listen(PORT, function () {
    console.log("server is running on", PORT);
})