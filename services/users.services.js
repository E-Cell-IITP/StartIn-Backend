const User = require('../models/user.model');
const bcryptsjs = require('bcryptjs');
const auth = require('../middlewares/auth.js');

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if( user !=null) {
        if(bcryptsjs.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(), token});
    }
    else {
        return callback ({
            message: 'Invalid username or password',
        })
    }
    }
    else {
        return callback ({
            message: 'Invalid username or password',
        })
    }
}

async function register(params, callback) {
    if ( params.username === undefined) {
        return callback({
            message: 'Username is required',
            status: 400,
        });
    }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback({
            message: error.message,
            status: 500,
        });
    });
}

module.exports = {
    login,
    register,
};
