const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await userController.getUserByNameAsync(username);
      if (!user) {
        return done(null, false);
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false);
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(
    async (id, done) => done(null, await userController.getUserByIdAsync(id))
  );
}

module.exports = initialize;
