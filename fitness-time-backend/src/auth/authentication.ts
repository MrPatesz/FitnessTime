import { PassportStatic } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthToken } from "../dtos/authToken";
import { User } from "../models/userModel";

export default function initPassport(passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwt: AuthToken, done: any /*TODO type*/) => {
        return User.findByPk(jwt.userId)
          .then((user) => done(null, user))
          .catch((err) => done(err));
      }
    )
  );
}
