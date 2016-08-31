'use strict';

const Event = use('Event');

module.exports = function (server) {
  const io = use('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('connection created >>>');
  });
};
