const express = require('express');
const socket = require('socket.io');

// APP setup
const app = express();
const port = 4000;
const server = app.listen(port, function () {
  console.log(`Listening to requests on port ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})