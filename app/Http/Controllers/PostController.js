'use strict';

const Post = use('App/Model/Post');
const attributes = ['room', 'message'];

class PostController {

  * index(request, response) {
    const posts = yield Post.with().fetch();

    response.jsonApi('Post', posts);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const post = yield Post.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Post', post);
  }

  * show(request, response) {
    const id = request.param('id');
    const post = yield Post.with().where({ id }).firstOrFail();

    response.jsonApi('Post', post);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const post = yield Post.with().where({ id }).firstOrFail();
    yield post.update(Object.assign({}, input, foreignKeys));

    response.send(post);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const post = yield Post.query().where({ id }).firstOrFail();
    yield post.delete();

    response.status(204).send();
  }

}

module.exports = PostController;
