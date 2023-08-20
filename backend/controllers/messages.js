import { Message } from '../models/message.js';
import mongoSanitize from 'express-mongo-sanitize';
import { idValidator } from '../utils/mongoose-id-validator.js';
import { pusher } from '../server.js';

//GET MESSAGES
export const getMessages = async (req, res) => {
    const { user_id1, user_id2 } = mongoSanitize.sanitize(req.query);

    if (!idValidator(user_id1) || !idValidator(user_id2)) {
        return res.status(404).json({ status: 'error', message: 'Invalid user ID' });
    }

    try {
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

//GET CONVERSATIONS
export const getConversations = async (req, res) => {

    if (!req.params.id || !idValidator(req.params.id)) {
        return res.status(404).json({ status: 'error', message: 'Ivalid user ID' });
    }

    try {
        const conversations = await Message.find({ sender_id: mongoSanitize.sanitize(req.params.id) }).populate('recipient_id', 'name lastname email image').select("recipient_id");
        const uniqueRecipients = [];

        // Filter conversations for remove duplicate
        const uniqueConversations = conversations.filter(conversation => {
            const recipientId = conversation.recipient_id._id.toString();
            if (!uniqueRecipients.includes(recipientId)) {
                uniqueRecipients.push(recipientId);
                return true;
            }
            return false;
        });

        res.status(200).json({ status: 'ok', conversations: uniqueConversations });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something went wrong', devMessage: error.message });
    }

}

//INSERT MESSAGE
export const insertMessage = async (req, res) => {
    const data = mongoSanitize.sanitize(req.body);

    if (!data.sender_id || !data.recipient_id || !idValidator(data.sender_id) || !idValidator(data.recipient_id)) {
        return res.status(404).json({ status: 'error', message: 'Invalid user ID' });
    }

    if (!data.text && !req.file) {
        return res.status(404).json({ status: 'error', message: 'At least one content is required' });
    }

    const message = new Message({
        sender_id: data.sender_id,
        recipient_id: data.recipient_id,
        text: data.text ? data.text : null,
        image: req.file ? mongoSanitize.sanitize(req.file.filename) : null,
    })
    try {
        await message.save();
        const channelName = `conversation_${data.sender_id}_${data.recipient_id}`;
        await pusher.trigger(channelName, "message", {
            message: message
        });
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
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
}