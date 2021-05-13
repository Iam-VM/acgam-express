const admin = require('../firebaseAdmin/admin');


const authVerify = (req, res, next) => {
    try {
        const {idtoken} = req.headers;
        admin
            .auth()
            .verifyIdToken(idtoken)
            .then((decodedToken) => {
                req.decodedToken = decodedToken;
                next();
            })
            .catch((error) => {
                console.log(req.body.data)
                res.status(401).send("Error 401: Unauthorised");
            });
    } catch (err) {
        res.status(400).send("Error 400: Bad Request");
    }
}

module.exports =  authVerify;
