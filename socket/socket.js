const logger = require('../middleware/logger');
const socketIo = require('socket.io');
let io;

const init = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('a user connected.');

        socket.on('disconnect', () => {
            console.log('user disconnected.');
        });
    });
    return io;
};

const messageEmit = (msg) => {
    io.emit('message-emit-to-client', msg);
};
const groupMessageEmit = (msg) => {
    io.emit('message-emit-to-clientGroup', msg);
};
const messageEmitImg = (msg) => {
    io.emit('message-emit-to-clientImg', msg);
};
const messageEmitImgGroup = (msg) => {
    io.emit('message-emit-to-clientImgGroup', msg);
};


module.exports = { init, messageEmit, groupMessageEmit, messageEmitImg, messageEmitImgGroup };