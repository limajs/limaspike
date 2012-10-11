function socketHandler (socket) {
    socket.on('spec', function (data) {
        console.log("LimaSpecs", data);
    });
    socket.on('spec_pass', function (data) {
        console.log("LimaSpec passed", data);
    });
    socket.emit('runspec', {value: 'Hello World'});
}

module.exports = socketHandler;
