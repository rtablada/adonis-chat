'use strict';

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.on('/').render('chat');

const Post = use('App/Model/Post');
const Event = use('Event');

Route.post('/post', function * (request, response) {
  const { room, message } = request.all();

  const post = yield Post.create({ room, message });

  response.send(post);
  Event.fire('post.create', post);
});
