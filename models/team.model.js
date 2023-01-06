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

});

TeamSchema.plugin(uniqueValidator, {message: 'Team name already in use.'});

module.exports = mongoose.model('Team', TeamSchema);