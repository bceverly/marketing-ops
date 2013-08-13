using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thrift.Protocol;
using Thrift.Server;
using Thrift.Transport;
using LegacyDLL;

namespace ThriftBridgeServer
{
    class LegacyClassHandler : LegacyClassService.Iface
    {
        LegacyClass legacy_class = new LegacyClass();

        public int AddTwoNumbers(int number1, int number2)
        {
            Console.WriteLine("AddTwoNumbers(" + number1 + "," + number2 + ") called");
            return legacy_class.AddTwoNumbers(number1, number2);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                LegacyClassHandler handler = new LegacyClassHandler();
                LegacyClassService.Processor processor = new LegacyClassService.Processor(handler);
                TServerTransport serverTransport = new TServerSocket(9090);

                TServer server = new TSimpleServer(processor, serverTransport);
                Console.WriteLine("Starting server...");
                server.Serve();
            }
            catch (Exception x)
            {
                Console.WriteLine(x.StackTrace);
            }
        }
    }
}
