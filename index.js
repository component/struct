
/**
 * Module dependencies.
 */

var read = require('./read');
var write = require('./write');

/**
 * Supported types.
 */

var types = {
  u8: 'uint8',
  uint8: 'uint8',
  u16: 'uint16',
  uint16: 'uint16',
  u32: 'uint32',
  uint32: 'uint32',
  string: 'string'
};

/**
 * Create a new struct function with the given `fields`.
 *
 *     var Pet = struct({
 *      id: 'uint32',
 *      name: 'string',
 *      age: 'uint16'
 *    });
 *
 * @param {Object} fields
 * @return {Function}
 * @api public
 */

module.exports = function(fields){

  function fn(obj){
    Struct.call(this, fields);
    if (obj) this.set(obj);
  }

  fn.prototype = new Struct;

  return fn;
};

/**
 * Initialize a new Struct with `fields`.
 *
 * @param {Array} fields
 * @api public
 */

function Struct(fields) {
  this.fields = fields;
  this.validate(fields);
}

/**
 * Validate `fields`, ensure that all types are correct.
 *
 * @param {Array} fields
 * @api private
 */

Struct.prototype.validate = function(fields){
  for (var key in fields) {
    var type = fields[key];
    if (types[type]) continue;
    throw new TypeError('unsupported type "' + type + '"');
  }
};

/**
 * Set a single or multiple field values.
 *
 * @param {String} name or object
 * @param {Mixed} value or nothing
 * @api public
 */

Struct.prototype.set = function(a, b){
  // <field> <value>
  if (2 == arguments.length) {
    return this.setField(a, b);
  }

  // <fields>
  for (var key in a) {
    this.set(key, a[key]);
  }
};

/**
 * Set field `name` to `val`.
 *
 * @param {String} name
 * @param {Mixed} val
 * @api public
 */

Struct.prototype.setField = function(name, val){
  var field = this.fields[name];
  if (!field) throw new Error('invalid field "' + name + '"');
  this[name] = val;
};

/**
 * Write struct to `buf` at `off` [0].
 *
 * TODO: add endianess support
 *
 * @param {Uint8Array} buf
 * @param {Number} off
 * @return {Number} bytes written
 * @api public
 */

Struct.prototype.write = function(buf, off){
  off = off || 0;

  for (var key in this.fields) {
    var type = types[this.fields[key]];
    var val = this[key];
    off += write[type](buf, off, val, true);
  }

  return off;
};

/**
 * Read struct from `buf` at `off` [0].
 *
 * @param {Uint8Array} buf
 * @param {Number} off
 * @return {Number} bytes read
 * @api public
 */

Struct.prototype.read = function(buf, off){
  var pos = { offset: off || 0 };

  for (var key in this.fields) {
    var type = types[this.fields[key]];
    var ret = read[type](buf, pos, true);
    this[key] = ret;
  }

  return pos.offset;
};
