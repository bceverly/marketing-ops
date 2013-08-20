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

        public Product getProductById(int id)
        {
            Console.WriteLine("GetProductById(" + id + ") called...");
            LegacyDLL.Product legacyResult = legacy_class.getProductById(id);

            Product retVal = new Product();
            retVal.Id = legacyResult.Id;
            retVal.Name = legacyResult.Name;
            retVal.Comments = legacyResult.Comments;
            return retVal;
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
