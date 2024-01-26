import { Server } from "socket.io"



export default function SocketHandler(req, res) {

    console.log("hola")
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on('connection', (socket) => {
        socket.on('send-message', (obj) => {
            io.emit('send-message', obj);
        });
    });



    console.log("Seting socket")
    res.end
}