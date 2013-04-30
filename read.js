
/**
 * Unsigned 8-bit integer.
 */

exports.uint8 = function(buf, pos){
  return buf[pos.offset++];
};

/**
 * Unsigned 16-bit integer.
 */

exports.uint16 = function(buf, pos, be){
  var o = pos.offset;
  pos.offset += 2;

  if (be) {
    return buf[o] << 8
      | buf[o + 1];
  }

  return buf[o + 1] << 8
   | buf[o];
};

/**
 * Unsigned 32-bit integer.
 */

exports.uint32 = function(buf, pos, be){
  var o = pos.offset;
  pos.offset += 4;

  if (be) {
    return buf[o] << 24
      | buf[o + 1] << 16
      | buf[o + 2] << 8
      | buf[o + 3];
  }

  return buf[o + 3] << 24
    | buf[o + 2] << 16
    | buf[o + 1] << 8
    | buf[o];
};

/**
 * NULL-delimited character array.
 */

exports.string = function(buf, pos){
  var arr = [];

  while (buf[pos.offset]) {
    arr.push(String.fromCharCode(buf[pos.offset++]));
  }
  pos.offset++;

  return arr.join('');
};
