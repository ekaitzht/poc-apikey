This project shows a JWT authentication system and API Key + Secret system.

To test API Key + Secret you need:

1. npm install
2. npm run start
3. Add postman-apikey-secret-pre-request.js to a Pre-request postman 
script. More info: https://www.getpostman.com/docs/v6/postman/scripts/pre_request_scripts
5. Add header Authorization with {{hmacAuthHeader}} in postman
4. Execute GET http://localhost/users in postman.

To test JWT:

1. npm install
2. npm run start
3. Add postman-jwt-pre-request.js to postman to a Pre-request postman 
script. 
5. Add header Authorization with {{hmacAuthHeader}} in postman
4. Execute GET http://localhost/users in postman.