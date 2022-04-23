const express = require("express");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const { JWT_SECRET } = process.env;

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtVerify = (jwtPayload, next) => {
  if (jwtPayload.expires > Date.now()) {
    return next("jwt expired");
  }
  return next(null, jwtPayload);
};

const jwtStrategy = new JwtStrategy(jwtOpts, jwtVerify);
passport.use(jwtStrategy);

export const authJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "We are sorry but we are not able to authenticate you",
        })
        .end();
    }
    req.user = user;
    next();
  })(req, res, next);
};
