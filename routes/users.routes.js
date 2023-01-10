const userController = require('../controllers/users.controller');


const express = require('express');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/user-profile', userController.userProfile);
router.post('/create-user-profit', userController.createUserProfit);
router.post('/team-register', userController.teamRegister);
router.post('/payment-detail', userController.paymentDetail);
router.get('/find-user-in-team', userController.findUserInTeam);
router.post('/get-team-from-token', userController.getTeamFromToken);

module.exports = router;