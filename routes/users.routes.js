const userController = require('../controllers/users.controller');


const express = require('express');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user-profile', userController.userProfile);
router.post('/create-user-profit', userController.createUserProfit);
router.post('/team-register', userController.teamRegister);
router.get('/find-user-in-team', userController.findUserInTeam);

module.exports = router;