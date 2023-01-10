const User = require('../models/user.model');
const UserProfit = require('../models/user.profit');
const Team = require('../models/team.model');
const Token = require('../models/token');
const bcryptjs = require('bcryptjs');
const auth = require('../middlewares/auth.js');

//login
async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if (user!=null) {
        if (bcryptjs.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            console.log(user._id);
            console.log(token);
            const n_token = new Token({userId : user._id, token : token});
            n_token.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
            return callback(null, { ...user.toJSON(), token });
        }
        else {
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
    if (params.teamName === undefined) {
        return callback({
            message: 'Team Name is required',
        });
    }
    console.log(params);
    let i = 0;
    let flag = true;
    let user = null
    for(i=0;i<params.members.length;i++)
    {
        let user = await User.findOne({username : params.members[i]})
        if(!user)
        {
            return callback(`${params.members[i]} is not a valid username`);
        }
        else if(user.teamName)
        {
            return callback(`${user.username} is already added to ${user.teamName}`);
        }
    }
    // if(i!==params.members.length)
    // {
    //     return callback(`${params.members[i]} is not a valid username`);
    // }
    // if(flag)
    // {
    //     return callback(`${user.username} is already added to ${user.teamName}`);
    // }
    const team = new Team(params);
    // to add the teamName field when you register as a team
    team.members.map(async (username)=>{
        return await User.updateOne({username : username},{$set : {teamName : team.teamName}})
    })
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
    const user = await Team.find({ members: params.username });
    if (user.length != 0) {
        return callback(null, user[0]);
    }
    else 
    {
        return callback("User is not assigned any team", null);
    }
}

async function paymentDetail(params, callback) {
    // Token.findOne({token : params.token})
    // .then(result=>{
    //     console.log(result)
    //     return User.findOne({_id : result.userId})
    // }
    // )
    // .then(user=>{
    //     return Team.UpdateOne({teamName : user.teamName},{$set : {imageUrl : params.link}});
    // })
    // .catch()
    // console.log(params);
    const result = await Token.findOne({token : params.token})
    console.log(result);
    if(result)
    {
        const user = await User.findOne({_id : result.userId});
        console.log(user);
        if(user)
        {
            const team = await Team.findOne({teamName : user.teamName});
            console.log(team);
            if(team)
            {
                team.imageUrl = params.link;
                team.save()
                .then((response) => {
                    return callback(null, response);
                })
                .catch((error) => {
                    return callback(error);
                });
            }
            else
            {
                return callback("Team not found");
            }
        }
        else
        {
            return callback("User not found");
        }
    }
    else
    {
        return callback("Token not found");
    }
}

async function getTeamFromToken(params, callback) {
    const result = await Token.findOne({token : params.token})
    console.log(result);
    if(result)
    {
        const user = await User.findOne({_id : result.userId});
        console.log(user);
        if(user)
        {
            const team = await Team.findOne({teamName : user.teamName});
            console.log(team);
            if(team)
            {
                return callback(null, team);
            }
            else
            {
                return callback("Team not found");
            }
        }
        else
        {
            return callback("User not found");
        }
    }
    else
    {
        return callback("Token not found");
    }
}


module.exports = {
    login,
    register,
    createUserProfit,
    teamRegister,
    findUserInTeam,
    paymentDetail,
    getTeamFromToken
    // forgetPassword,
};
