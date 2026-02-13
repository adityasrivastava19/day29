const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Todo } = require('../database/db');

exports.signup = async (req, res) => {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exist = await User.findOne({
            username: username
        })
        if (exist) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hpass = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name,
            username: username,
            password: hpass
        })
        if (user) {
            return res.status(201).json({ message: "User created successfully" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exist = await User.findOne({
            username: username
        })
        if (!exist) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const match = await bcrypt.compare(password, exist.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: exist._id, username: exist.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token: token });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        return res.status(200).json({ todos });
    } catch (err) {
        console.error('Get todos error:', err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.addtodo = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description
        if (!description || !title) {
            return res.status(400).json({ message: "all thing are required" });
        }
        const todo = await Todo.create({
            title: title,
            description: description,
            status: false,
            user: req.user.id
        });
        return res.status(200).json({ message: "todo is added " });
    }
    catch (err) {
        return res.status(500).json({ message: "server error" });
    }

};

exports.deletetodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user.id
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found " });
        }
        return res.status(200).json({ message: "todo deleted" });
    } catch (err) {
        return res.status(500).json({ message: "server error" });
    }
};