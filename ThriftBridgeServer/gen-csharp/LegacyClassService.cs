/**
 * Autogenerated by Thrift Compiler (0.9.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Thrift;
using Thrift.Collections;
using System.Runtime.Serialization;
using Thrift.Protocol;
using Thrift.Transport;

public partial class LegacyClassService {
  public interface Iface {
    int AddTwoNumbers(int number1, int number2);
    #if SILVERLIGHT
    IAsyncResult Begin_AddTwoNumbers(AsyncCallback callback, object state, int number1, int number2);
    int End_AddTwoNumbers(IAsyncResult asyncResult);
    #endif
  }

  public class Client : Iface {
    public Client(TProtocol prot) : this(prot, prot)
    {
    }

    public Client(TProtocol iprot, TProtocol oprot)
    {
      iprot_ = iprot;
      oprot_ = oprot;
    }

    protected TProtocol iprot_;
    protected TProtocol oprot_;
    protected int seqid_;

    public TProtocol InputProtocol
    {
      get { return iprot_; }
    }
    public TProtocol OutputProtocol
    {
      get { return oprot_; }
    }


    
    #if SILVERLIGHT
    public IAsyncResult Begin_AddTwoNumbers(AsyncCallback callback, object state, int number1, int number2)
    {
      return send_AddTwoNumbers(callback, state, number1, number2);
    }

    public int End_AddTwoNumbers(IAsyncResult asyncResult)
    {
      oprot_.Transport.EndFlush(asyncResult);
      return recv_AddTwoNumbers();
    }

    #endif

    public int AddTwoNumbers(int number1, int number2)
    {
      #if !SILVERLIGHT
      send_AddTwoNumbers(number1, number2);
      return recv_AddTwoNumbers();

      #else
      var asyncResult = Begin_AddTwoNumbers(null, null, number1, number2);
      return End_AddTwoNumbers(asyncResult);

      #endif
    }
    #if SILVERLIGHT
    public IAsyncResult send_AddTwoNumbers(AsyncCallback callback, object state, int number1, int number2)
    #else
    public void send_AddTwoNumbers(int number1, int number2)
    #endif
    {
      oprot_.WriteMessageBegin(new TMessage("AddTwoNumbers", TMessageType.Call, seqid_));
      AddTwoNumbers_args args = new AddTwoNumbers_args();
      args.Number1 = number1;
      args.Number2 = number2;
      args.Write(oprot_);
      oprot_.WriteMessageEnd();
      #if SILVERLIGHT
      return oprot_.Transport.BeginFlush(callback, state);
      #else
      oprot_.Transport.Flush();
      #endif
    }

    public int recv_AddTwoNumbers()
    {
      TMessage msg = iprot_.ReadMessageBegin();
      if (msg.Type == TMessageType.Exception) {
        TApplicationException x = TApplicationException.Read(iprot_);
        iprot_.ReadMessageEnd();
        throw x;
      }
      AddTwoNumbers_result result = new AddTwoNumbers_result();
      result.Read(iprot_);
      iprot_.ReadMessageEnd();
      if (result.__isset.success) {
        return result.Success;
      }
      throw new TApplicationException(TApplicationException.ExceptionType.MissingResult, "AddTwoNumbers failed: unknown result");
    }

  }
  public class Processor : TProcessor {
    public Processor(Iface iface)
    {
      iface_ = iface;
      processMap_["AddTwoNumbers"] = AddTwoNumbers_Process;
    }

    protected delegate void ProcessFunction(int seqid, TProtocol iprot, TProtocol oprot);
    private Iface iface_;
    protected Dictionary<string, ProcessFunction> processMap_ = new Dictionary<string, ProcessFunction>();

    public bool Process(TProtocol iprot, TProtocol oprot)
    {
      try
      {
        TMessage msg = iprot.ReadMessageBegin();
        ProcessFunction fn;
        processMap_.TryGetValue(msg.Name, out fn);
        if (fn == null) {
          TProtocolUtil.Skip(iprot, TType.Struct);
          iprot.ReadMessageEnd();
          TApplicationException x = new TApplicationException (TApplicationException.ExceptionType.UnknownMethod, "Invalid method name: '" + msg.Name + "'");
          oprot.WriteMessageBegin(new TMessage(msg.Name, TMessageType.Exception, msg.SeqID));
          x.Write(oprot);
          oprot.WriteMessageEnd();
          oprot.Transport.Flush();
          return true;
        }
        fn(msg.SeqID, iprot, oprot);
      }
      catch (IOException)
      {
        return false;
      }
      return true;
    }

    public void AddTwoNumbers_Process(int seqid, TProtocol iprot, TProtocol oprot)
    {
      AddTwoNumbers_args args = new AddTwoNumbers_args();
      args.Read(iprot);
      iprot.ReadMessageEnd();
      AddTwoNumbers_result result = new AddTwoNumbers_result();
      result.Success = iface_.AddTwoNumbers(args.Number1, args.Number2);
      oprot.WriteMessageBegin(new TMessage("AddTwoNumbers", TMessageType.Reply, seqid)); 
      result.Write(oprot);
      oprot.WriteMessageEnd();
      oprot.Transport.Flush();
    }

  }


  #if !SILVERLIGHT
  [Serializable]
  #endif
  public partial class AddTwoNumbers_args : TBase
  {
    private int _number1;
    private int _number2;

    public int Number1
    {
      get
      {
        return _number1;
      }
      set
      {
        __isset.number1 = true;
        this._number1 = value;
      }
    }

    public int Number2
    {
      get
      {
        return _number2;
      }
      set
      {
        __isset.number2 = true;
        this._number2 = value;
      }
    }


    public Isset __isset;
    #if !SILVERLIGHT
    [Serializable]
    #endif
    public struct Isset {
      public bool number1;
      public bool number2;
    }

    public AddTwoNumbers_args() {
    }

    public void Read (TProtocol iprot)
    {
      TField field;
      iprot.ReadStructBegin();
      while (true)
      {
        field = iprot.ReadFieldBegin();
        if (field.Type == TType.Stop) { 
          break;
        }
        switch (field.ID)
        {
          case 1:
            if (field.Type == TType.I32) {
              Number1 = iprot.ReadI32();
            } else { 
              TProtocolUtil.Skip(iprot, field.Type);
            }
            break;
          case 2:
            if (field.Type == TType.I32) {
              Number2 = iprot.ReadI32();
            } else { 
              TProtocolUtil.Skip(iprot, field.Type);
            }
            break;
          default: 
            TProtocolUtil.Skip(iprot, field.Type);
            break;
        }
        iprot.ReadFieldEnd();
      }
      iprot.ReadStructEnd();
    }

    public void Write(TProtocol oprot) {
      TStruct struc = new TStruct("AddTwoNumbers_args");
      oprot.WriteStructBegin(struc);
      TField field = new TField();
      if (__isset.number1) {
        field.Name = "number1";
        field.Type = TType.I32;
        field.ID = 1;
        oprot.WriteFieldBegin(field);
        oprot.WriteI32(Number1);
        oprot.WriteFieldEnd();
      }
      if (__isset.number2) {
        field.Name = "number2";
        field.Type = TType.I32;
        field.ID = 2;
        oprot.WriteFieldBegin(field);
        oprot.WriteI32(Number2);
        oprot.WriteFieldEnd();
      }
      oprot.WriteFieldStop();
      oprot.WriteStructEnd();
    }

    public override string ToString() {
      StringBuilder sb = new StringBuilder("AddTwoNumbers_args(");
      sb.Append("Number1: ");
      sb.Append(Number1);
      sb.Append(",Number2: ");
      sb.Append(Number2);
      sb.Append(")");
      return sb.ToString();
    }

  }


  #if !SILVERLIGHT
  [Serializable]
  #endif
  public partial class AddTwoNumbers_result : TBase
  {
    private int _success;

    public int Success
    {
      get
      {
        return _success;
      }
      set
      {
        __isset.success = true;
        this._success = value;
      }
    }


    public Isset __isset;
    #if !SILVERLIGHT
    [Serializable]
    #endif
    public struct Isset {
      public bool success;
    }

    public AddTwoNumbers_result() {
    }

    public void Read (TProtocol iprot)
    {
      TField field;
      iprot.ReadStructBegin();
      while (true)
      {
        field = iprot.ReadFieldBegin();
        if (field.Type == TType.Stop) { 
          break;
        }
        switch (field.ID)
        {
          case 0:
            if (field.Type == TType.I32) {
              Success = iprot.ReadI32();
            } else { 
              TProtocolUtil.Skip(iprot, field.Type);
            }
            break;
          default: 
            TProtocolUtil.Skip(iprot, field.Type);
            break;
        }
        iprot.ReadFieldEnd();
      }
      iprot.ReadStructEnd();
    }

    public void Write(TProtocol oprot) {
      TStruct struc = new TStruct("AddTwoNumbers_result");
      oprot.WriteStructBegin(struc);
      TField field = new TField();

      if (this.__isset.success) {
        field.Name = "Success";
        field.Type = TType.I32;
        field.ID = 0;
        oprot.WriteFieldBegin(field);
        oprot.WriteI32(Success);
        oprot.WriteFieldEnd();
      }
      oprot.WriteFieldStop();
      oprot.WriteStructEnd();
    }

    public override string ToString() {
      StringBuilder sb = new StringBuilder("AddTwoNumbers_result(");
      sb.Append("Success: ");
      sb.Append(Success);
      sb.Append(")");
      return sb.ToString();
    }

  }

}