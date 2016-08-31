'use strict';

module.exports = function (server) {
  const io = use('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('connection created >>>');
  });
};
