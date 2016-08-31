(function () {
  'use strict';

  const createElement = (innerHTML) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = innerHTML.trim();

    return tmp.firstChild;
  };

  const chooseRoomTemplate = `
    <form action="">
      <h2>Join A Room</h2>
      <input type="text" class="room-name"/>
      <button class="submit" type="submit">Submit</button>
    </form>`;

  const chatRoomTemplate = `
    <div class="chat-view">
      <h2 class="room-name"></h2>
      <ul class="messages">

      </ul>
      <form action="" class="message-form">
        <input class="message-input" autocomplete="off" /><button>Send</button>
      </form>
    </div>`;

  class RoomView {
    constructor(app) {
      this.app = app;
      this.el = createElement(chooseRoomTemplate);
      this.selectors = {
        roomName: this.el.querySelector('.room-name'),
      };

      this.el.addEventListener('submit', (ev) => {
        ev.preventDefault();
        this.submit();
      });
    }

    submit() {
      const value = this.selectors.roomName.value;

      this.app.chooseRoom(value);
      this.selectors.roomName.value = '';
    }
  }

  class ChatView {
    constructor(app) {
      this.app = app;
      this.el = createElement(chatRoomTemplate);
      this.selectors = {
        roomName: this.el.querySelector('.room-name'),
        form: this.el.querySelector('.message-form'),
        messageList: this.el.querySelector('.messages'),
        messageInput: this.el.querySelector('.message-input'),
      };

      this.selectors.messageInput.addEventListener('submit', (ev) => {
        ev.preventDefault();
        this.submit();
      });
    }

    join() {
      this.selectors.roomName.innerText = this.app.state.roomName;

      this.app.socket.emit('join', this.app.state.roomName);
      this.app.socket.on('post', (post) => {
        console.log(post);
      });
    }
  }

  class App {
    constructor(el) {
      this.el = el;
      this.socket = io();
      this.state = {};
      this.roomView = new RoomView(this);
      this.chatView = new ChatView(this);
    }

    start() {
      this.showRoomView();
    }

    clear() {
      this.el.innerHTML = '';
    }

    showRoomView() {
      this.clear();
      this.el.appendChild(this.roomView.el);
    }

    showChatView() {
      this.clear();
      this.el.appendChild(this.chatView.el);
    }

    chooseRoom(roomName) {
      this.state = { roomName };
      this.chatView.join(this.state.roomName);
      this.showChatView();
    }
  }

  const app = new App(document.querySelector('.chat'));
  app.start();
})();
