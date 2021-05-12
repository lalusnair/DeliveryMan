using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Shared
{
    public static class Common
    {
        public static int? NullableInt(string field, SqlDataReader reader)
        {
            var a = reader[field];
            if (a != DBNull.Value)
            {
                return Convert.ToInt32(a);
            }
            return null;
        }

        public static string NullableString(string field, SqlDataReader reader)
        {
            var a = reader[field];
            if (a != DBNull.Value)
            {
                return a.ToString();
            }
            return null;
        }
        public static decimal? NullableDecimal(string field, SqlDataReader reader)
        {
            var a = reader[field];
            if (a != DBNull.Value)
            {
                return Convert.ToDecimal(a);
            }
            return null;
        }
        public static DateTime? NullableDate(string field, SqlDataReader reader)
        {
            var a = reader[field];
            if (a != DBNull.Value)
            {
                return Convert.ToDateTime(a);
            }
            return null;
        }
        public static TimeSpan? NullableTime(string field, SqlDataReader reader)
        {
            var a = reader[field];
            if (a != DBNull.Value)
            {
                return (TimeSpan)a;
            }
            return null;
        }
    }
}
