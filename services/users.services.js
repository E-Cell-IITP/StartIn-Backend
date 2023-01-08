const User = require('../models/user.model');
const UserProfit = require('../models/user.profit');
const Token = require('../models/token');
const Team = require('../models/team.model');
const bcryptjs = require('bcryptjs');
const auth = require('../middlewares/auth.js');

//login
async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
    if (user != null) {
        if (bcryptjs.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            const tokenModel = new Token({ token, userId: user._id });
            tokenModel.save();
            const team = await Team.find({ members: username });
            if(team.length>0){
                const updateTeamName =await User.updateOne({username:username},{$set:{teamName:team[0].teamName} });
                // console.log(updateTeamName);
                // console.log('this is team name');
            }
            else{
                const nullTeam =await User.updateOne({username:username},{$set:{teamName:null} });
                // console.log(nullTeam );
                // console.log('this is null');
            }
            return callback(null, { ...user.toJSON(), token });
        }
        else{
            return callback({
                message: 'Invalid username or password',
            })
        }
    }
    else {
        return callback({
            message: 'Invalid username or password',
        })
    }

}
//logout
async function logout(params, callback) {
    const token = await Token.findOneAndDelete({ token: params.token });
    if (token != null) {
        return callback(null, token);
    }
    else {
        return callback({
            message: 'Invalid token',
        })
    }
}
//user register
async function register(params, callback) {
    if (params.username === undefined) {
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
    const userId = await Token.findOne({ token: params.token });
    if (userId == null) {
        return callback({
            message: 'Invalid token',
        })
    }
    const u = await User.findOne({ _id: userId.userId });
    params.user = u.username;
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
    const token = await Token.findOne({ token: params.token });
    if (token == null) {
        return callback({
            message: 'Invalid token',
        })
    }
    else {
        if (params.teamName === undefined) {
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
}

//team profit
// async function teamProfit(params, callback) {
//     const token = await Token.findOne({ token: params.token });
//     if (token == null) {
//         return callback({
//             message: 'Invalid token',
//         })
//     }
//     else {
//         const u = await User.findOne({ _id: token.userId });
//         const team = await Team.findOne({ members: u.username });
//         if (team != null) {
            


    // find user in team by username 
    async function findUserInTeam(params, callback) {
        const userId = await Token.findOne({ token: params.token });
        if (userId == null) {
            return callback({
                message: 'Invalid token',
            })
        }
        const u = await User.findOne({ _id: userId.userId });
        const user = await Team.find({ members: u.username });
        const updateTeamName =await User.updateOne({ _id: userId.userId }, { $set: { teamName: user[0].teamName } });
        if (user != null) {
            return callback(null, user);
        }
    }


    module.exports = {
        login,
        logout,
        register,
        createUserProfit,
        teamRegister,
        findUserInTeam,
        // forgetPassword,
    };
