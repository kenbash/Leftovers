const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user.controller');

const router = express.Router();

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.sendStatus(400);
  }
  return next();
}

router.post('/register', checkNotAuthenticated, userController.registerUser);
router.post('/login', checkNotAuthenticated, passport.authenticate('local'), userController.loginUser);
router.delete('/logout', userController.logoutUser);
router.get('/', userController.getUser);

module.exports = router;
