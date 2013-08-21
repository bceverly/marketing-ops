using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Npgsql;

namespace LegacyDLL
{
    public class ProductAPI
    {
        public Product getProductById(int id)
        {
            Console.WriteLine("Calling getProductById");
            Product x = new Product();
            x.Id = 42;
            x.Name = "Hi";
            x.Notes = "World";
            return x;
/*            try
            {
                Console.WriteLine("Setting up logging...");
                NpgsqlEventLog.Level = LogLevel.Debug;
                NpgsqlEventLog.LogName = "NpgsqlTests.LogFile";
                NpgsqlEventLog.EchoMessages = true;

                Console.WriteLine("Getting ready to connect to DB");
                NpgsqlConnection conn = new NpgsqlConnection("Server=192.168.56.101;Port=5432;User Id=postgres;Password=postgres;Database=marketingops;");
                Console.WriteLine("DB Connected");
                conn.Open();

                Console.WriteLine("Executing query");
                NpgsqlCommand command = new NpgsqlCommand("select * from product where id=" + id.ToString(), conn);
                NpgsqlDataReader dr = command.ExecuteReader();
                if (dr.Read())
                {
                    Console.WriteLine("Read row");
                    Product returnVal = new Product();
                    returnVal.Id = (int)dr["id"];
                    returnVal.Name = (string)dr["name"];
                    returnVal.Notes = (string)dr["notes"];

                    Console.WriteLine("Returning data");
                    return returnVal;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return null;
            }

            Console.WriteLine("Failed somehow...");
            return null;*/
        }
    }
}
