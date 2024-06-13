const { Strategy, ExtractJwt } = require("passport-jwt");
const userModel = require("../models/userModel");

const jwtOptions = {
    secretOrKey: "mySecret",
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter("token"),
    ]),
    ignoreExpiration: false,
};

const jwtVerify = async (jwtPayload, cb) => {
    try {

        const user = await userModel.findById(jwtPayload._id);

        if (!user) {
            return cb(null, false);
        }
        cb(null, user);
    } catch (error) {
        console.log("From passport.js.....\n", error);
        cb(error, false);
    }
};
const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
module.exports = jwtStrategy;