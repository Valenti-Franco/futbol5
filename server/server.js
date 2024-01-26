const { createServer } = require('http');
const { Server } = require('socket.io');


const httpserver = createServer()

const io = new Server(httpserver, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


io.on('connection', async (socket) => {
    console.log('A user connected');

    // Handle chat messages
    socket.on('MenssageNew', (obj) => {
        io.emit('Menssage-recibe', obj); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

httpserver.listen(5000, () => {
    console.log('WebSocket server listening on port 5000');
});