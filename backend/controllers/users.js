import { User } from '../models/user.js';
import mongoSanitize from 'express-mongo-sanitize';
import { idValidator } from '../utils/mongoose-id-validator.js'
import fs from 'fs';

//GET ALL USERS FROM DB
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '_id name lastname email image');
        res.status(200).json({ status: 'ok', users: users });
    } catch (error) {
        res.json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//UPDATE USER
export const updateUser = async (req, res) => {
    const data = { ...req.body };

    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    }

    try {
        const updateData = { ...data };
        if (req.file) {
            updateData.image = mongoSanitize.sanitize(req.file.filename);
        }
        const user = await User.findByIdAndUpdate(req.params.id, mongoSanitize.sanitize(updateData), { new: true, runValidators: true });
        res.status(200).json({ status: 'ok', user: { id: user.id, name: user.name, lastname: user.lastname, email: user.email, image: user.image } });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {

    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid ID' });
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user.image) {
            const imagePath = 'C:/Users/Roberto Hasa/Desktop/Project Work/real_time_chat_mevn_stack/frontend/public/images/users' + user.image;

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}