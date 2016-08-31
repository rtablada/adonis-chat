'use strict';

const Event = use('Event');

module.exports = (server) => {
  const io = use('socket.io')(server);

  io.on('connection', (socket) => {
    const rooms = {};
    // Listens for users to join a channel
    socket.on('join', (roomName) => {
      console.log('user joined: ' + roomName);

      // Listens for local event called "post.create"
      rooms[roomName] = Event.on('post.create', function * (post) {
        console.log('post: ' + post.room);

        // Checks if the post is in the current room
        if (post.room === roomName) {
          // Sends the post to the client
          socket
            .emit('post', post.toJSON());
        }
      });
    });

    // I think this leaves chat.
    socket.on('leave', (roomName) => {
      Event.removeListeners(rooms[roomName]);
    });

    console.log('connection created >>>');
  });
};
