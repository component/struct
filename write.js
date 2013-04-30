
/**
 * Unsigned 8-bit integer.
 */

exports.uint8 = function(buf, o, n){
  buf[o] = n;
  return 1;
};

/**
 * Unsigned 16-bit integer.
 */

exports.uint16 = function(buf, o, n, be){
  if (be) {
    buf[o] = (n >>> 8) & 0xff;
    buf[o + 1] = n & 0xff;
  } else {
    buf[o + 1] = (n >>> 8) & 0xff;
    buf[o] = n & 0xff;
  }

  return 2;
};

/**
 * Unsigned 32-bit integer.
 */

exports.uint32 = function(buf, o, n, be){
  if (be) {
    buf[o] = (n >>> 24) & 0xff;
    buf[o + 1] = (n >>> 16) & 0xff;
    buf[o + 2] = (n >>> 8) & 0xff;
    buf[o + 3] = n & 0xff;
  } else {
    buf[o + 3] = (n >>> 24) & 0xff;
    buf[o + 2] = (n >>> 16) & 0xff;
    buf[o + 1] = (n >>> 8) & 0xff;
    buf[o] = n & 0xff;
  }

  return 4;
};

/**
 * NULL-delimited character array.
 */

exports.string = function(buf, o, str){
  var len = str.length;

  for (var i = 0; i < len; i++) {
    buf[o++] = str.charCodeAt(i);
  }
  buf[o++] = 0;

  return len + 1;
};
