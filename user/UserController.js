var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var CryptoJS = require("crypto-js"); //replace thie with script tag in browser env
var jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require("./User");

// RETURNS ALL THE USERS IN THE DATABASE API KEY HMAC Authentication
router.get("/", function(req, res) {
  let hmac512 = req.headers.authorization.split(":").pop();
  let requestedData = [req.method, req.originalUrl].join("");

  const hmacDigest = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA512(requestedData, "SECRET_KEY")
  );
  console.log('Signed: '+requestedData)
  console.log(hmacDigest);
  console.log(hmac512);
  if (hmacDigest === hmac512) {
    console.log("Correct!!! You have permissions");
    User.find({}, function(err, users) {
      if (err)
        return res.status(500).send("There was a problem finding the users.");
      res.status(200).send(users);
    });
  } else {
    return res.json(
      "Incorret!!! You do not have permissions for this operation"
    );
  }
});

// RETURNS ALL THE USERS IN THE DATABASE API KEY HMAC Authentication
router.get("/jwt", function(req, res) {

    console.log(req.headers);

    /*
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
    */

});

module.exports = router;
