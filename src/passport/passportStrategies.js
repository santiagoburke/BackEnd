import passport from "passport";
import { Strategy as LocalStrategy } from "passport-github2";
import { Strategy as GitHubStrategy } from "passport-github2";
import { usersModel } from "../dao/models/users.model";
import { hashPassword, comparePasswords, generateToken } from "../../utils";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

const cookieExtractor = (req) => {
    const token = req?.cookies?.token
    return token
}

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await usersModel.findOne({ email })
        if (user) {
            return done(null, false)
        }
        const hashNewPassword = await hashPassword(password)
        const newUser = { ...req.body, password: hashNewPassword }
        const newUserBD = await usersModel.create(newUser)
        done(null, newUserBD)
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await usersModel.findOne({ email })
        if (!user) {
            return done(null, false)
        }
        const isPass = await comparePasswords(password, user.password)
        if (!isPass) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error)
    }
}))

passport.use('githubSignup', new GitHubStrategy({
    clientID: 'Iv1.c4ec79fba1d1f84c',
    clientSecret: '444e7f0044c719cb605534c041ca275ed32a7a22',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await usersModel.findOne({ email: profile._json.email });
        if (!user) {
            const newUSer = {
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || ' ',
                email: profile._json.email,
                password: ' ',
            };
            const dbResult = await usersModel.create(newUSer);
            done(null, dbResult);
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
}));

passport.use('current', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'secretJWT'
}, async (jwtPayload, done) => {
    console.log('----jwtpayload----', jwtPayload)
    if (jwtPayload.user) {
        done(null, jwtPayload.user)
    } else {
        done(null, false)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await usersModel.findById(_id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

