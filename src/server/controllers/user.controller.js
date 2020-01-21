const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// TODO: write checkAuthentication middleware

exports.registerUser = async (req, res) => {
  try {
    // TODO: Check username not taken

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    user.save((err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  } catch {
    res.sendStatus(500);
  }
};

// TODO: use passport.authenticate
exports.loginUser = (req, res) => {};

// TODO: req.logout?
exports.logoutUser = (req, res) => {};

// TODO: use middleware to check login state on startup
exports.getUser = (req, res) => {};

exports.getUserByNameAsync = async name => User.findOne({ name });

exports.getUserByIdAsync = async id => User.findById(id);
