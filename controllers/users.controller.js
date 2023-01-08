const bcryptjs = require('bcryptjs');
const userService = require('../services/users.services');

//user register
exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
            
        }
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
    });
};

//logout
exports.logout = (req, res, next) => {
    userService.logout(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'User logged out successfully',
            data: result,
        });
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

