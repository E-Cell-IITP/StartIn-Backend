const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfitSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    remarks: {
        type: String,
    },
},
{
    timestamps: true,
});

const UserProfit = mongoose.model('UserProfit', userProfitSchema);

module.exports = UserProfit;