#!/usr/bin/python

import hashlib
import hmac
import requests
import time
import base64

apikey = '';
apisecret = '';

def request_comkort( url ):
        tosign = "&".join( [i + '=' + payload[i] for i in payload] )
        sign = base64.b64encode(hmac.new( apisecret, tosign , hashlib.sha512));
        headers = {'A': sign.hexdigest(), 'nonce': int( time.time() ), 'apikey': apikey }
        r = requests.post(url, data='', headers=headers)
        return r.text



import hashlib
import hmac

APIkey = b'AAA-BBB-CCC'
secret = b'123abc'

payload = {
    'command': 'returnBalances',
    'nonce': int(time() * 1000),
}

paybytes = urllib.parse.urlencode(payload).encode('utf8')
print(paybytes)

sign = hmac.new(secret, paybytes, hashlib.sha512).hexdigest()
print(sign)