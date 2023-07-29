import { Message } from '../models/message.js';
import mongoSanitize from 'express-mongo-sanitize';
import { idValidator } from '../utils/mongoose-id-validator.js';

//GET MESSAGES
export const getMessages = async (req, res) => {
    try {
        const { user_id1, user_id2 } = mongoSanitize.sanitize(req.query);

        if (!idValidator(user_id1) || !idValidator(user_id2)) {
            return res.status(404).json({ status: 'error', message: 'Invalid user IDs' });
        }

        const messages = await Message.find({
            $or: [
                { sender_id: user_id1, recipient_id: user_id2 },
                { sender_id: user_id2, recipient_id: user_id1 }
            ]
        });

        res.status(200).json({ status: 'ok', messages: messages });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
};

//INSERT MESSAGE
export const insertMessage = async (req, res) => {
    const message = new Message(mongoSanitize.sanitize(req.body));

    if (!messages.sender_id || !message.recipient_id || !idValidator(message.sender_id) || !idValidator(message.recipient_id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid user IDs' });
    }

    if (!message.text && !message.image) {
        return res.status(404).json({ status: 'error', message: 'At least one content is required' });
    }

    try {
        await message.save();
        res.status(201).json({ status: 'ok', message: message });
    } catch (error) {
        res.status(404).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }

}

//UPDATE MESSAGE
export const updateMessage = async (req, res) => {
    const data = { ...req.body };

    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Id not valid' });
    }

    try {
        const message = await Message.findByIdAndUpdate(req.params.id, mongoSanitize.sanitize(data), { new: true });
        res.status(200).json({ status: 'ok', message: message });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }
}

//DELETE MESSAGE
export const deleteMessage = async (req, res) => {
    if (!idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Id not valid' });
    }

    try {
        await Message.findByIdAndDelete(req.params.id);
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
}