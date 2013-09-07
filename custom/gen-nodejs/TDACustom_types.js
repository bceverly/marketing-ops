//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var ttypes = module.exports = {};
TDACustomPayload = module.exports.TDACustomPayload = function(args) {
  this.numberOfArguments = null;
  this.arguments = null;
  if (args) {
    if (args.numberOfArguments !== undefined) {
      this.numberOfArguments = args.numberOfArguments;
    }
    if (args.arguments !== undefined) {
      this.arguments = args.arguments;
    }
  }
};
TDACustomPayload.prototype = {};
TDACustomPayload.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.numberOfArguments = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.MAP) {
        var _size0 = 0;
        var _rtmp34;
        this.arguments = {};
        var _ktype1 = 0;
        var _vtype2 = 0;
        _rtmp34 = input.readMapBegin();
        _ktype1 = _rtmp34.ktype;
        _vtype2 = _rtmp34.vtype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var key6 = null;
          var val7 = null;
          key6 = input.readString();
          val7 = input.readString();
          this.arguments[key6] = val7;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TDACustomPayload.prototype.write = function(output) {
  output.writeStructBegin('TDACustomPayload');
  if (this.numberOfArguments !== null && this.numberOfArguments !== undefined) {
    output.writeFieldBegin('numberOfArguments', Thrift.Type.I32, 1);
    output.writeI32(this.numberOfArguments);
    output.writeFieldEnd();
  }
  if (this.arguments !== null && this.arguments !== undefined) {
    output.writeFieldBegin('arguments', Thrift.Type.MAP, 2);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRING, Thrift.objectLength(this.arguments));
    for (var kiter8 in this.arguments)
    {
      if (this.arguments.hasOwnProperty(kiter8))
      {
        var viter9 = this.arguments[kiter8];
        output.writeString(kiter8);
        output.writeString(viter9);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TDACustomResult = module.exports.TDACustomResult = function(args) {
  this.success = null;
  this.returnValue = null;
  this.returnString = null;
  this.continueProcessing = null;
  this.numberOfArguments = null;
  this.transformedArguments = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.returnValue !== undefined) {
      this.returnValue = args.returnValue;
    }
    if (args.returnString !== undefined) {
      this.returnString = args.returnString;
    }
    if (args.continueProcessing !== undefined) {
      this.continueProcessing = args.continueProcessing;
    }
    if (args.numberOfArguments !== undefined) {
      this.numberOfArguments = args.numberOfArguments;
    }
    if (args.transformedArguments !== undefined) {
      this.transformedArguments = args.transformedArguments;
    }
  }
};
TDACustomResult.prototype = {};
TDACustomResult.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.returnValue = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.returnString = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.BOOL) {
        this.continueProcessing = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.numberOfArguments = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.MAP) {
        var _size10 = 0;
        var _rtmp314;
        this.transformedArguments = {};
        var _ktype11 = 0;
        var _vtype12 = 0;
        _rtmp314 = input.readMapBegin();
        _ktype11 = _rtmp314.ktype;
        _vtype12 = _rtmp314.vtype;
        _size10 = _rtmp314.size;
        for (var _i15 = 0; _i15 < _size10; ++_i15)
        {
          var key16 = null;
          var val17 = null;
          key16 = input.readString();
          val17 = input.readString();
          this.transformedArguments[key16] = val17;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TDACustomResult.prototype.write = function(output) {
  output.writeStructBegin('TDACustomResult');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 1);
    output.writeBool(this.success);
    output.writeFieldEnd();
  }
  if (this.returnValue !== null && this.returnValue !== undefined) {
    output.writeFieldBegin('returnValue', Thrift.Type.I32, 2);
    output.writeI32(this.returnValue);
    output.writeFieldEnd();
  }
  if (this.returnString !== null && this.returnString !== undefined) {
    output.writeFieldBegin('returnString', Thrift.Type.STRING, 3);
    output.writeString(this.returnString);
    output.writeFieldEnd();
  }
  if (this.continueProcessing !== null && this.continueProcessing !== undefined) {
    output.writeFieldBegin('continueProcessing', Thrift.Type.BOOL, 4);
    output.writeBool(this.continueProcessing);
    output.writeFieldEnd();
  }
  if (this.numberOfArguments !== null && this.numberOfArguments !== undefined) {
    output.writeFieldBegin('numberOfArguments', Thrift.Type.I32, 5);
    output.writeI32(this.numberOfArguments);
    output.writeFieldEnd();
  }
  if (this.transformedArguments !== null && this.transformedArguments !== undefined) {
    output.writeFieldBegin('transformedArguments', Thrift.Type.MAP, 6);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRING, Thrift.objectLength(this.transformedArguments));
    for (var kiter18 in this.transformedArguments)
    {
      if (this.transformedArguments.hasOwnProperty(kiter18))
      {
        var viter19 = this.transformedArguments[kiter18];
        output.writeString(kiter18);
        output.writeString(viter19);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
