var SocketIO = require('socket.io'),
    Bridge = require('./bridge');

exports.listen = function (server) {
    var io = SocketIO.listen(server);
    io.on('connection', function (socket) {
        var bridge = new Bridge(socket);
        bridge.start();
    });
};