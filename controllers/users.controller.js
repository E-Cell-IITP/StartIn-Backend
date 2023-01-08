const bcryptjs = require('bcryptjs');
const userService = require('../services/users.services');
const mailer = require('../services/email');

//user register
exports.register = (req, res, next) => {
    const { password } = req.body;
    console.log(req.body);
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        var mail = {email: req.body.Email, username: req.body.username, password: password }
        mailer.mailer(mail);
        return res.status(200).send({
            message: 'User registered successfully',
            data: result,            
        });
    });
};

//login
exports.login = (req, res, next) => {
    const { username, password } = req.body;

    userService.login({username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'User logged in successfully',
            data: result,
        });
        req.session.username= username;
    });
};

//userProfile
exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: 'Authorized User!' });
};

// create user profit
exports.createUserProfit = (req, res, next) => {
    userService.createUserProfit(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'User profit created successfully',
            data: result,
        });
    });
}

// team register
exports.teamRegister = (req, res, next) => {
    userService.teamRegister(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Team registered successfully',
            data: result,
        });
    });
}

// find user in team by username 
exports.findUserInTeam = (req, res, next) => {
    userService.findUserInTeam(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'User found successfully',
            data: result,
        });
    });
}

