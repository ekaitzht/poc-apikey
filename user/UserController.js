var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js'); //replace thie with script tag in browser env

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/', function(req, res) {
    User.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
        function(err, user) {
            if (err)
                return res
                    .status(500)
                    .send('There was a problem adding the information to the database.');
            res.status(200).send(user);
        }
    );
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res) {
    console.log(req.headers);
    let hmac512 = req.headers.authorization.split(':').pop();
    let requestedData = [req.method, req.originalUrl].join('');

    const hmacDigest = CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA512(requestedData, 'SECRET_KEY')
    );

    console.log(hmacDigest);
    console.log(hmac512);
    if (hmacDigest === hmac512) {
        console.log('Correct!!! You have permissions');
        User.find({}, function(err, users) {
            if (err) return res.status(500).send('There was a problem finding the users.');
            res.status(200).send(users);
        });
    } else {
        return res.json('Incorret!!! You do not have permissions for this operation');
    }
});

module.exports = router;
