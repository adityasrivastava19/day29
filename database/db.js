const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const users = new Schema({
    name: String,
    username: String,
    password: String
});

const todo = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    description: String,
    status: Boolean
});
const User = mongoose.model('User', users);
const Todo = mongoose.model('Todo', todo);
module.exports = { User, Todo };
