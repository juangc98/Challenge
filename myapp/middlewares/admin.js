function admin(req, res, next) {

    if(req.session.user != undefined){
        if (req.session.user.rol != 0) {
            return next();
        } else {
            return res.redirect('/');
        }
    } else {
        return res.redirect('/users/login');
    }

}

module.exports = admin;