const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetDateObject = require('src/commons/utils/set-date-object');

const ConversationSchema = new Schema({
    participants: {
        type: Array,
        default: []
    },
    last_message: {
        text: {
            type: String, default: null
        },
        created_at: {
            date: {
                type: String, default: null
            },
            timestamp: {
                type: String, default: null
            }
        },
        sender_id: {
            type: String, default: null
        }
    },

    created_at: {
        date: {
            type: String, default: null
        },
        timestamp: {
            type: String, default: null
        }
    },
    updated_at: {
        date: {
            type: String, default: null
        },
        timestamp: {
            type: String, default: null
        }
    }
}, {
    collection: 'conversations'
});

ConversationSchema.methods.setDateProperty = function(property, value) {
    this[property] = new SetDateObject(value);
}

ConversationSchema.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
    }

    next();
});

module.exports = mongoose.model('ConversationSchema', ConversationSchema);
