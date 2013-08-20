using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;

namespace LegacyDLL
{
    public class ProductAPI
    {
        public Product getProductById(int id)
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=192.168.56.101;Port=5432;User Id=postgres;Password=postgres;Database=marketingops;");
            conn.Open();

            NpgsqlCommand command = new NpgsqlCommand("select * from product where id=" + id.ToString(), conn);
            NpgsqlDataReader dr = command.ExecuteReader();
            if (dr.Read())
            {
                Product returnVal = new Product();
                returnVal.Id = (int)dr["id"];
                returnVal.Name = (string)dr["name"];
                returnVal.Comments = (string)dr["comments"];

                return returnVal;
            }

            return null;
        }
    }
}
