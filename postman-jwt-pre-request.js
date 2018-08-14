function getAuthHeader(httpMethod, requestUrl, requestBody) {
    var SECRET_KEY = 'SECRET_KEY';
    

    header = CryptoJS.enc.Base64.stringify({
        "alg": "HS256",
        "typ": "JWT"
    });
    payload = CryptoJS.enc.Base64.stringify({
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
    });   

    var requestData = [header,".",payload].join("");
    console.log('Signing this: '+requestData)
    var hmacDigest = CryptoJS.HmacSHA256(requestData, SECRET_KEY);
    return hmacDigest;
}
 
postman.setEnvironmentVariable('hmacAuthHeader', getAuthHeader(request['method'], request['url'], request['data']));