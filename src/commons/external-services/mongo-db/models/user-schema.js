const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetDateObject = require('src/commons/utils/set-date-object');

const UserSchema = new Schema({
    username: {
        type: String, default: ''
    },
    email: {
        type: String, default: ''
    },
    password: {
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
    collection: 'users'
});

UserSchema.methods.setDateProperty = function(property, value) {
    this[property] = new SetDateObject(value);
}

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.setDateProperty('created_at');
    }

    next();
});

module.exports = mongoose.model('UserSchema', UserSchema);
