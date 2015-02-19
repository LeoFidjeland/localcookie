# localCookie

A localStorage implementation in a cookie

## Purpose

Use it in browser libs where you want to store session tokens and the like in the cookie instead of in localStorage. So that you can store things across multiple subdomains.

## Usage

    var localStorage = require('localcookie')
      , myValue = { foo: 'bar', baz: 'quux' }
      ;

    localStorage.setItem('myKey', JSON.stringify(myValue));
    myValue = localStorage.getItem('myKey');

## API

  * getItem(key)
  * setItem(key, value)
  * removeItem(key)
  * clear()
  * key(n)
  * length

## Tests

    npm test

TODO / Bugs
---

  * Tests for config
