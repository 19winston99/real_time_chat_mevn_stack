import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    sender_id: {
        type: String,
        require: true,
        ref: 'User',
    },
    recipient_id: {
        type: String,
        require: true,
        ref: 'User',
    },
    text: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);