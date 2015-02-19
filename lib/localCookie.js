"use strict";

var db;
var options = {};

function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch(e) {
    // Ignore any invalid uri component
  }
}

function LocalCookie() {
}
db = LocalCookie;

db.prototype.config = function(opt){
  var expiresFor;

  if (typeof opt.expires === 'number') {
    expiresFor = opt.expires;
    opt.expires = new Date();
    if (opt.expirationUnit !== undefined) {
      if (opt.expirationUnit === 'hours') {
        opt.expires.setHours(opt.expires.getHours() + expiresFor);
      } else if (opt.expirationUnit === 'minutes') {
        opt.expires.setMinutes(opt.expires.getMinutes() + expiresFor);
      } else if (opt.expirationUnit === 'seconds') {
        opt.expires.setSeconds(opt.expires.getSeconds() + expiresFor);
      } else {
        opt.expires.setDate(opt.expires.getDate() + expiresFor);
      }
    } else {
      opt.expires.setDate(opt.expires.getDate() + expiresFor);
    }
  }

  options = opt;
};

db.prototype.getItem = function (key) {

  var list = [];
  var all = window.document.cookie;
  if (all) {
    list = all.split('; ');
  }

  for (var i = 0; i < list.length; ++i) {
    if (list[i]) {
      var cookie = list[i];
      var pos = cookie.indexOf('=');
      var name = cookie.substring(0, pos);
      var value = tryDecodeURIComponent(cookie.substring(pos + 1));
      if(value === undefined)
        continue;

      if (key === undefined || key === name) {
        if (key === name) {
          return value;
        }
      }
    }
  }
  return null;
};

db.prototype.setItem = function (key, value) {

  value = typeof value === 'object' ? JSON.stringify(value) : String(value);

  return (window.document.cookie = [
    encodeURIComponent(key),
    '=',
    encodeURIComponent(value),
    options.expires ? '; expires=' + options.expires.toUTCString() : '',
    options.path ? '; path=' + options.path : '',
    options.domain ? '; domain=' + options.domain : '',
    options.secure ? '; secure' : ''
    ].join(''));
};

db.prototype.removeItem = function (key) {
  var cookies = document.cookie.split("; ");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var pos = cookie.indexOf('=');
    var name = cookie.substring(0, pos);
    if(name == key){
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
};

db.prototype.clear = function () {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

db.prototype.key = function (i) {

  var list = []; 
  var all = window.document.cookie;
  if (all) {
    list = all.split('; ');
  }

  if (list[i]) {
    var cookie = list[i];
    var pos = cookie.indexOf('=');
    var name = cookie.substring(0, pos);
    return name;
  }
  return null;
};

db.prototype.__defineGetter__('length', function () {
  var list = [];
  var all = window.document.cookie;
  if (all) {
    list = all.split('; ');
  }
  return list.length;
});

module.exports = new LocalCookie();