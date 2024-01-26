const { createServer } = require('http');
const { Server } = require('socket.io');


const httpserver = createServer()
let countUser = 0
const io = new Server(httpserver, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


io.on('connection', async (socket) => {
    console.log('A user connected');

    countUser++
    io.emit('userCount', countUser);
    // Handle chat messages
    socket.on('MenssageNew', (obj) => {
        io.emit('Menssage-recibe', {
            obj, time: new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }).format(new Date()), countUser
        }); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        countUser--
        io.emit('userCount', countUser);
    });
});

httpserver.listen(5000, () => {
    console.log('WebSocket server listening on port 5000');
});