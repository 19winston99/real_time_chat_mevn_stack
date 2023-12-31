import mongoose from "mongoose";

const userBlockedSchema = mongoose.Schema({
    blocking_user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    blocked_user_id: {
        type: String,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

export const UserBlocked = mongoose.model('UserBlocked', userBlockedSchema);

/* 
SCHEMA VALIDATOR

db.createCollection("userblockeds", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['blocking_user_id', 'blocked_user_id'],
            properties: {
                blocking_user_id: {
                    bsonType: 'string',
                    description: 'Id required'
                },
                blocked_user_id: {
                    bsonType: 'string',
                    description: 'Id required'
                },
            }
        }
    }
}) */