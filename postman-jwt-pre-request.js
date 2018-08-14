/* Pre-requisite
==================
1) Create an Environment (if you don't already have on) and enable it for your request
2) Add a new Header with key as "Authorization" and value as "{{hmacAuthHeader}}"
3) Add the following Pre-request Script that computes the hmacAuthHeader variable and adds it to the environment
4) Fill your CLIENT_KEY and SECRET_KEY with valid values
*/

 function base64url(source) {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}
 
function getAuthHeader(httpMethod, requestUrl, requestBody) {
    var SECRET_KEY = 'SECRET_KEY';
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    
    payload = {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
    };   
    
    header = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
    payload = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));


    var requestData = [header,".",payload].join("");
    var hmacDigest = base64url(CryptoJS.HmacSHA256(requestData, SECRET_KEY));
    
    jwtToken = header+"."+payload+"."+hmacDigest;

    return header+"."+payload+"."+hmacDigest;
}
 
postman.setEnvironmentVariable('hmacAuthHeader', getAuthHeader(request['method'], request['url'], request['data']));