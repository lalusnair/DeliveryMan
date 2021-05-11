using GeoFence.ClientApp.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using GeoFence.ClientApp.Shared;

namespace GeoFence.ClientApp.Data
{
    public class ItemRepository
    {
        private readonly string _connectionString;

        public ItemRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<List<Item>> GetAll()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetAllItemDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Item>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValue(reader));
                        }
                    }
                    return response;
                }
            }
        }

        public async Task<Item> GetByID(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetItemDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    Item response = null;
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response = MapToValue(reader);
                        }
                    }
                    return response;
                }
            }
        }

        public async Task<bool> Insert(string itemJson)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString)){
                using (SqlCommand cmd = new SqlCommand("da.CreateItem", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", 4));
                    cmd.Parameters.Add(new SqlParameter("@pItemInfoJson", itemJson));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        public async Task<bool> Edit(string hotelJson, int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.UpdateItem", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    cmd.Parameters.Add(new SqlParameter("@pItemInfoJson", hotelJson));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        public async Task<bool> DeleteByID(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.DeleteItem", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        private Item MapToValue(SqlDataReader reader)
        {
            return new Item()
            {
                CategoryId = Common.NullableInt("CategoryId", reader),
                CategoryName = Common.NullableString("CategoryName", reader),
                SubCategoryId = Common.NullableInt("SubCategoryId", reader),
                SubCategoryName = Common.NullableString("SubCategoryName", reader),
                HotelId = Common.NullableInt("HotelId", reader),
                Image = Common.NullableString("Image", reader),
                Ingrediants = Common.NullableString("Ingrediants", reader),
                Hotel_Name = Common.NullableString("Hotel_Name", reader),
                Isdeleted = Common.NullableInt("Isdeleted", reader),
                ItemAvailableTime = Common.NullableDecimal("ItemAvailableTime", reader),
                ItemId = Common.NullableInt("ItemId", reader),
                ItemName = Common.NullableString("ItemName", reader),
                OurPrice = Common.NullableDecimal("OurPrice", reader),
                Preparationtime = Common.NullableDecimal("Preparationtime", reader),
                SellingPrice = Common.NullableDecimal("SellingPrice", reader)
            };
        }
    }
}
