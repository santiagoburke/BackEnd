import jwt from 'jsonwebtoken'

export function jwtValidation(req, res, next) {
    const authHeader = req.get('Authorization')
    const token = authHeader.split(' ')[1]
    const isValid = jwt.verify(token, 'secretJWT')
    if (isValid) {
        req.user = isValid.user
        next()
    } else {
        res.json({ message: 'error' })
    }
}