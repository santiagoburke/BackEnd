import { Router } from "express";
import passport from "passport";
import '../passport/passportStrategies.js'
import { signupUser, loginUser, getGithub, logout } from "../controllers/users.controller.js";

const usersRouter = Router()

usersRouter.post('/signup', signupUser)

usersRouter.post('/login', loginUser)

usersRouter.get(
    '/loginGithub',
    passport.authenticate('githubLogin', { scope: ['user:email'] })
);

usersRouter.get(
    "/github",
    passport.authenticate("githubLogin", { failureRedirect: "/errorLogin" }),
    getGithub
);

usersRouter.get('/logout', logout)

export default usersRouter