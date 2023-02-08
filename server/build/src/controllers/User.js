"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res, next) => {
    const { name } = req.body;
    console.log('hihi', req.body);
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    return user
        .save()
        .then(user => res.status(201).json({ user }))
        .catch(error => res.status(500).json({ error }));
};
const readUser = (req, res, next) => {
    const userID = req.params.userID;
    return User_1.default.findById(userID)
        .then(user => user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'Not Found [read]' }))
        .catch(error => res.status(500).json({ error }));
};
const readAllUsers = (req, res, next) => {
    return User_1.default.find()
        .then(users => res.status(200).json({ users }))
        .catch(error => res.status(500).json({ error }));
};
const updateUser = (req, res, next) => {
    const userID = req.params.userID;
    return User_1.default.findById(userID)
        .then(user => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then(user => res.status(201).json({ user }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not Found [update]' });
        }
    });
};
const deleteUser = (req, res, next) => {
    const userID = req.params.userID;
    return User_1.default.findByIdAndDelete(userID)
        .then(user => user
        ? res.status(201).json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Not Found [delete]' }))
        .catch(error => res.status(500).json({ message: error }));
};
exports.default = { createUser, readUser, readAllUsers, updateUser, deleteUser };
