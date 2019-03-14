const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];    
        jwt.verify(token , 'SecretKey_WillBe_Attached_Here');
        next();
    }
    catch(error){
        res.status(401).json({
            message : 'Authentication Failed'
        });
    }
}