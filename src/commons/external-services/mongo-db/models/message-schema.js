const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetDateObject = require('src/commons/utils/set-date-object');

const MessageSchema = new Schema({
    request_id: {
        type: String, default: ''
    },
    conversation_id: {
        type: String, default: ''
    },
    sender_id: {
        type: String, default: ''
    },
    text: {
        type: String, default: ''
    },

    created_at: {
        date: {
            type: String, default: ''
        },
        timestamp: {
            type: String, default: ''
        }
    }
}, {
    collection: 'messages'
});

MessageSchema.methods.setDateProperty = function(property, value) {
    this[property] = new SetDateObject(value);
}

MessageSchema.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
    }

    next();
});

module.exports = mongoose.model('MessageSchema', MessageSchema);
