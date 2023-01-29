// import required libraries
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const logger = require('../logger');
const key = require('../settings/settings.config');
const User = require('../users/models/User');

// authenticate the user by jwt strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.APP_PRIVATE_KEY;

// create payload
const payload = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findByPk(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((error) => {
          const meta = 'jwt-strategy';

          logger.error(`Unable to connect to the database: ${error.message}`, {
            ...error,
            meta,
          });
        });
    }),
  );
};

// export jwt strategy
module.exports = payload;
