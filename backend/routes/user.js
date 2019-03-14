const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                mobile: req.body.mobile,
                password: hash
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'User Created',
                    result: result
                });
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        }
    );

});

router.post("/getUserData", (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {

        if (!user) {

            return res.status(401).json({
                message: 'User Not Found'
            });
        }
        else {
            let userToSend = {
                email: user.email,
                name: user.name,
                mobile: user.mobile,
            }
            return res.status(200).json({
                message: 'User Found',
                user: userToSend
            });
        }
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser = {};
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'User Not Found / Invalid username and password entered'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'User Not Found / Invalid username and password entered'
            });
        }
        const token = jwt.sign({
            email: fetchedUser.email,
            userId: fetchedUser._id,
            name: fetchedUser.name,
            mobile: fetchedUser.mobile,
        }, 'SecretKey_WillBe_Attached_Here', { expiresIn: '1h' });
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            email: fetchedUser.email
        });
    }).catch(err => {
        return res.status(401).json({
            message: 'User Not Found / Invalid username and password entered'
        });
    });
})

module.exports = router;