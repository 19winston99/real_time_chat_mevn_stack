import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

/* 
SCHEMA VALIDATOR

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ['name', 'lastname', 'email', 'password', 'image'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'Name field is required'
                },
                lastname: {
                    bsonType: 'string',
                    description: 'Lastname field is required'
                },
                email: {
                    bsonType: 'string',
                    description: 'Email field is required'
                },
                password: {
                    bsonType: 'string',
                    description: 'Password field is required'
                },
                image: {
                    bsonType: 'string',
                    description: 'Image field is required'
                },
            }
        }
    }
}) */