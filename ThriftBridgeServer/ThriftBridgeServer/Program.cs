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
    class ProductServiceHandler : ProductService.Iface
    {
        ProductAPI legacy_class = new ProductAPI();

        public Product GetProductById(int id)
        {
            Console.WriteLine("getProductById(" + id + ") called");

            try
            {
                LegacyDLL.Product thriftReturn = legacy_class.getProductById(id);
                Product retVal = new Product();
                retVal.Id = thriftReturn.Id;
                retVal.Name = thriftReturn.Name;
                retVal.Notes = thriftReturn.Notes;

                return retVal;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }

            return null;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                ProductServiceHandler handler = new ProductServiceHandler();
                ProductService.Processor processor = new ProductService.Processor(handler);
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