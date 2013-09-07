//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./TDACustom_types');
//HELPER FUNCTIONS AND STRUCTURES

TDACustom_PerformCallout_args = function(args) {
  this.data = null;
  if (args) {
    if (args.data !== undefined) {
      this.data = args.data;
    }
  }
};
TDACustom_PerformCallout_args.prototype = {};
TDACustom_PerformCallout_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.data = new ttypes.TDACustomPayload();
        this.data.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TDACustom_PerformCallout_args.prototype.write = function(output) {
  output.writeStructBegin('TDACustom_PerformCallout_args');
  if (this.data !== null && this.data !== undefined) {
    output.writeFieldBegin('data', Thrift.Type.STRUCT, 1);
    this.data.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TDACustom_PerformCallout_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
TDACustom_PerformCallout_result.prototype = {};
TDACustom_PerformCallout_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.TDACustomResult();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TDACustom_PerformCallout_result.prototype.write = function(output) {
  output.writeStructBegin('TDACustom_PerformCallout_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TDACustomClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
TDACustomClient.prototype = {};
TDACustomClient.prototype.PerformCallout = function(data, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_PerformCallout(data);
};

TDACustomClient.prototype.send_PerformCallout = function(data) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('PerformCallout', Thrift.MessageType.CALL, this.seqid);
  var args = new TDACustom_PerformCallout_args();
  args.data = data;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TDACustomClient.prototype.recv_PerformCallout = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TDACustom_PerformCallout_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('PerformCallout failed: unknown result');
};
TDACustomProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
TDACustomProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

TDACustomProcessor.prototype.process_PerformCallout = function(seqid, input, output) {
  var args = new TDACustom_PerformCallout_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.PerformCallout(args.data, function (err, result) {
    var result = new TDACustom_PerformCallout_result((err != null ? err : {success: result}));
    output.writeMessageBegin("PerformCallout", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}
