const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
  try {
    if (await User.findOne({ username: req.body.username })) {
      res.sendStatus(409);
      return;
    }

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
      res.sendStatus(200);
    });
  } catch {
    res.sendStatus(500);
  }
};

exports.loginUser = (_req, res) => {
  res.sendStatus(200);
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.sendStatus(200);
};

exports.getUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.send({ username: req.user.username });
  }
  return res.send({ username: null });
};

exports.getUserByNameAsync = async name => User.findOne({ username: name });

exports.getUserByIdAsync = async id => User.findById(id);
