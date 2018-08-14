/* Pre-requisite
==================
1) Create an Environment (if you don't already have on) and enable it for your request
2) Add a new Header with key as "Authorization" and value as "{{hmacAuthHeader}}"
3) Add the following Pre-request Script that computes the hmacAuthHeader variable and adds it to the environment
4) Fill your CLIENT_KEY and SECRET_KEY with valid values
*/

function getPath(url) {
    var pathRegex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
    var result = url.match(pathRegex);
    return result && result.length > 1 ? result[1] : '';
}

function getQueryString(url) {
    var arrSplit = url.split('?');
    return arrSplit.length > 1 ? url.substring(url.indexOf('?') + 1) : '';
}

function getAuthHeader(httpMethod, requestUrl, requestBody) {
    var CLIENT_KEY = 'clientkey';
    var SECRET_KEY = 'SECRET_KEY';

    var requestPath = getPath(requestUrl);
    var queryString = getQueryString(requestUrl);
    if (httpMethod == 'GET' || !requestBody) {
        requestBody = '';
    } else {
        requestBody = JSON.stringify(requestBody);
    }

    var requestData = [httpMethod, requestPath].join('');
    console.log('Signing this: ' + requestData);
    var hmacDigest = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA512(requestData, SECRET_KEY));
    var authHeader = `APICENTRAL ${CLIENT_KEY}:${hmacDigest}`;
    return authHeader;
}

postman.setEnvironmentVariable(
    'hmacAuthHeader',
    getAuthHeader(request['method'], request['url'], request['data'])
);
