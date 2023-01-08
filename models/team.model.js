const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const TeamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        enum: ['Food', 'Services', 'Others'],
    },
    imageUrl: {
        type: String,
    },

    Profit: [{
        user: {
            type: String,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        remarks: {
            type: String,
        },
    }
    ]

});

TeamSchema.plugin(uniqueValidator, {message: 'Team name already in use.'});

module.exports = mongoose.model('Team', TeamSchema);