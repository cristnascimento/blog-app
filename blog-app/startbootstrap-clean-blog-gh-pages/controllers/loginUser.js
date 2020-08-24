const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const {username, password} = req.body;

    User.findOne({username: username}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    res.redirect('/');
                }
                else {
                    console.log("Wrong user or password.");
                    res.redirect('/auth/login');
                }
            });
        }
        else {
            console.log(`User not found: [${username}]`);
            res.redirect('/auth/login');
        }
    });
};