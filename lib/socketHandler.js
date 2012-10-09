function socketHandler (socket) {
    socket.emit('runspec', {value: 'Hello World'});
}

module.exports = socketHandler;
