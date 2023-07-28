import { User } from '../models/user.js';
// import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import { idValidator } from '../utils/mongoose-id-validator.js'

//GET ALL USERS FROM DB
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '_id name lastname email');
        res.status(200).json({ status: 'ok', users: users });
    } catch (error) {
        res.json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//UPDATE USER
export const updateUser = async (req, res) => {
    const data = { ...req.body };

    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    // }

    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, mongoSanitize.sanitize(data), { new: true });
        res.status(200).json({ status: 'ok', user: {id: user.id, name: user.name, lastname: user.lastname, email: user.email} });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    // }

    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}