'use strict';

const Schema = use('Schema');

class PostSchema extends Schema {

  up() {
    this.create('posts', (table) => {
      table.increments();
      table.string('room');
      table.text('message');
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }

}

module.exports = PostSchema;
