import { Router } from 'express'
import { usersModel } from '../dao/models/users.model.js'
import passport from 'passport'
import { comparePasswords } from '../utils.js'
import '../passport/passportStrategies.js'

const usersRouter = Router()

/* usersRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const userExist = await usersModel.findOne({ email, password })
    if (userExist) {
        res.redirect('/errorSignup')
    } else {
        await usersModel.create(req.body)
        res.redirect('/login')
    }
}) */

/* usersRouter.post('/login', async (req,res)=>{
    const {email, password} = req.body
    const user = await usersModel.findOne({email, password})
    if (user) {
        const {first_name, last_name} = user
        req.session = {
            logged: true,
            email,
            first_name,
            last_name,
            role: email === 'adminCoder@coder.com' && password === 'adminCod3r123' ? 'Admin' : 'User',
            admin: email === 'adminCoder@coder.com' && password === 'adminCod3r123',
            user: email !== 'adminCoder@coder.com' || password !== 'adminCod3r123'
        }
        if (req.session.admin) {
            res.redirect('/admin')
        } else {
            res.redirect('/products')
        } 
    } else {
        res.redirect('/errorLogin')
    }
}) */

usersRouter.get('/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/login')
        }
    })
})

usersRouter.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/errorSignup',
    successRedirect: '/products',
    passReqToCallback: true,
}))

usersRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/errorLogin',
    passReqToCallback: true,
}, (req, res, user) => {
    req.session.email = req.user.email;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    if (req.user.email === 'adminCoder@coder.com' && req.user.password === 'adminCod3r123') {
        req.session.admin = true
        req.session.user = false
        req.session.role = 'Admin'
    } else {
        req.session.admin = false
        req.session.user = true
        req.session.role = 'User'
    }
    if (req.session.admin === true) {
        res.redirect('/admin')
    } else {
        res.redirect('/products')
    }
}
))

usersRouter.get('/loginGithub', passport.authenticate('githubLogin', { scope: ['user:email'] }))

usersRouter.get('/github', passport.authenticate('githubLogin', { failureRedirect: '/errorLogin' }), async (req, res) => {
    req.session.email = req.user.email,
    req.session.first_name = req.user.first_name,
    req.session.last_name = req.user.last_name,
    req.session.age = req.user.age,
    req.session.logged = true
    if (req.session.email === 'adminCod3r@coder.com' && req.session.password === 'adminCod3r123') {
        req.session.admin = true
        req.session.user = false
        req.session.role = 'Admin'    
    } else {
        req.session.admin = false
        req.session.user = true
        req.session.role = 'User'
    }
    if (req.session.admin === true) {
        res.redirect('/admin')
    } else {
        res.redirect('/products')
    }
})

export default usersRouter