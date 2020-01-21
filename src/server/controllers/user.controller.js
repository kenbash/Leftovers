const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
  try {
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