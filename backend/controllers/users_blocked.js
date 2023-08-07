import { UserBlocked } from '../models/user_blocked.js';
import mongoSanitize from 'express-mongo-sanitize';
import { idValidator } from '../utils/mongoose-id-validator.js';

//GET USERS BLOCKED
export const getUsersBlocked = async (req, res) => {
    if (!idValidator(req.params.id) || !req.params.id) {
        return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    };

    try {
        const usersBlocked = await UserBlocked.find({blocking_user_id: mongoSanitize.sanitize(req.params.id)}).populate('blocked_user_id', 'id_ name lastname').select('blocked_user_id');
        res.status(200).json({ status: 'ok', usersBlocked: usersBlocked });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//INSERT USER BLOCKED
export const insertUserBlocked = async (req, res) => {
    const data = mongoSanitize.sanitize(req.body);

    if (!data.blocking_user_id || !data.blocked_user_id || !idValidator(data.blocking_user_id) || !idValidator(data.blocked_user_id) || (data.blocking_user_id == data.blocked_user_id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid user ID' });
    }

    const userBlocked = new UserBlocked({
        blocking_user_id: data.blocking_user_id,
        blocked_user_id: data.blocked_user_id
    });

    try {
        await userBlocked.save();
        res.status(201).json({ status: 'ok', userBlocked: userBlocked });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//DELETE BLOCKED USER
export const deleteUserBlocked = async (req, res) => {
    if (!idValidator(req.params.id) || !req.params.id) {
        return res.status(404).json({ status: 'error', message: 'Invalid user ID' });
    }

    try {
        await UserBlocked.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}