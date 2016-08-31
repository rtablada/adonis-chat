const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Post extends JsonApiView {
  get attributes() {
    return ['room', 'message'];
  }
}

module.exports = Post;
