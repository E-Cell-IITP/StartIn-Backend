const User = require('../models/user.model');
const UserProfit = require('../models/user.profit');
const Team = require('../models/team.model');
const bcryptjs = require('bcryptjs');
const auth = require('../middlewares/auth.js');

//login
async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if(user) {
        if(bcryptjs.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(), token});
    }
    }
    else {
        return callback ({
            message: 'Invalid username or password',
        })   
    }
}

//user register
async function register(params, callback) {
    if ( params.username === undefined) {
        return callback({
            message: 'Username is required',
        });
    }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

// async function forgetPassword({Email}, callback ) {
//     const user = await User.findOne({ Email });

//     if ( user != null) {
//         return callback(null, user);
//     }
// }

// create user profit
async function createUserProfit(params, callback) {
    const userProfit = new UserProfit(params);
    userProfit.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

//team register
async function teamRegister(params, callback) {
    if ( params.teamName === undefined) {
        return callback({
            message: 'Team Name is required',
        });
    }
    const team = new Team(params);
    team.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

// find user in team by username 
async function findUserInTeam(params, callback) {
    const user = await Team.find({members : params.username});
    if ( user != null) {
        return callback(null, user);
    }
}


module.exports = {
    login,
    register,
    createUserProfit,
    teamRegister,
    findUserInTeam,
    // forgetPassword,
};
