import { Router } from 'express'
import { usersModel } from '../dao/models/users.model.js'

const usersRouter = Router()

usersRouter.post('/signup', async (req,res)=>{
    const {email, password } = req.body
    const userExist = await usersModel.findOne({email,password})
    if (userExist) {
        res.redirect('/errorSignup')
    } else {
        await usersModel.create(req.body)
        res.redirect('/login')
    }
})

usersRouter.post('/login', async (req,res)=>{
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
})

usersRouter.get('/logout', async (req,res)=>{
    req.session.destroy((error)=>{
        if (error) {
            console.log(error)
        } else {
            res.redirect('/login')
        }
    })
})

export default usersRouter