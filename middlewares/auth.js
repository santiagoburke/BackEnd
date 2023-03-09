function auth(req, res, next) {
    req.session.logged ? next() : res.redirect('/login')
}

function isLogged(req, res, next) {
    if (req.session.logged) {
        req.session.admin ? res.redirect('/admin') : res.redirect('/products')
    } else {
        next()
    }

}

function isAdmin(req, res, next) {
    req.session.admin ? next() : res.redirect('/products')
}

export { auth, isLogged, isAdmin }