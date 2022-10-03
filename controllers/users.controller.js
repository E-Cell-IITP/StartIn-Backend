const bcryptsjs = require('bcryptjs');
const userSerrvices = require('../services/users.services');

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptsjs.genSaltSync(10);

    req.body.password = bcryptsjs.hashSync(password, salt);

    userSerrvices.register(req.body, (err, user) => {
        if (err) {
            return next(err);
            
        }
        return res.status(200).send({
            message: 'User registered successfully',
            data: result,            
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    userSerrvices.login({username, password }, (err, result) => {
        if (err) {
            return next(err);
        }
        return res.status(200).send({
            message: 'User logged in successfully',
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: 'Authorized User!' });
};