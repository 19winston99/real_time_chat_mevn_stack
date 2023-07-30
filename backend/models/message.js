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

/* 
SCHEMA VALIDATOR

db.createCollection("messages", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['sender_id', 'recipient_id],
            properties: {
                sender_id: {
                    bsonType: 'string',
                    description: 'Sender id is required'
                },
                recipient_id: {
                    bsonType: 'string',
                    description: 'Recipient id is required'
                },
                text: {
                    bsonType: 'string',
                },
                image: {
                    bsonType: 'string',
                },
            }
        }
    }
}) */