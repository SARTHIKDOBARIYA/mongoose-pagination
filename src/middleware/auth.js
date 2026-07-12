const passport = require('../config/passport');  // Corrected path to import your passport configuration

const auth = () => passport.authenticate('jwt', { session: false });

module.exports = auth;
