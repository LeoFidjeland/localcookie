# localcookie

A localStorage implementation in a cookie

Loosly based on https://github.com/ivpusic/angular-cookie

## Purpose

Use it in browser libs where you want to store session tokens and the like in the cookie instead of in localStorage. So that you can store things across multiple subdomains.

## Usage

    var localStorage = require('localcookie')
      , myValue = { foo: 'bar', baz: 'quux' }
      ;

    localStorage.config({expires: 21, domain: '.mydomain.com'});
    localStorage.setItem('myKey', JSON.stringify(myValue));
    myValue = localStorage.getItem('myKey');

## API

  * config(options)
  * getItem(key)
  * setItem(key, value)
  * removeItem(key)
  * clear()
  * key(n)
  * length
  

## Options

#### Domain


```
domain: 'example.com'
```

The domain tells the browser to which domain the cookie should be sent. 
If you don't specify it, it becomes the domain of the page that sets the cookie.

#### Path

```
path: '/'
```

The path gives you the chance to specify a directory where the cookie is active.

#### Expires

```
expires: 21
```

Each cookie has an expiry date after which it is trashed.
If you don't specify the expiry date the cookie is trashed when you close the browser.

#### Expiration Unit

```
expirationUnit: 'minutes'
```

Allows you to set the expiration time in ``hours``, ``minutes`` or ``seconds``.
If this is not specified, any expiration time specified will default to days.

#### Secure

```
secure: true
```

The Secure attribute is meant to keep cookie communication limited to encrypted transmission, 
directing browsers to use cookies only via secure/encrypted connections.

## Notes
Only strings as values

## Tests

    npm install
    grunt
    npm test

TODO / Bugs
---

  * Tests for config
