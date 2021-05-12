using GeoFence.ClientApp.Models;
using GeoFence.ClientApp.Shared;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Data
{
    public class SubCategoryRepository
    {
        private readonly string _connectionString;

        public SubCategoryRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<List<SubCategory>> GetAll()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetAllSubCategoryDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<SubCategory>();
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

        public async Task<List<SubCategoryDropDown>> GetSubCategoriesForDropdown(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.SelectSubCategory", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@pId", id));
                    var response = new List<SubCategoryDropDown>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValueForDorpDown(reader));
                        }
                    }
                    return response;
                }
            }
        }

        public async Task<SubCategory> GetByID(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetSubCategoryDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    SubCategory response = null;
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

        public async Task<bool> Insert(int categoryID, string subcategory)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.CreateSubCategory", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", -1));
                    cmd.Parameters.Add(new SqlParameter("@pCatId", categoryID));
                    cmd.Parameters.Add(new SqlParameter("@pSubCatName", subcategory));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        public async Task<bool> Edit(string subcategory, int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.UpdateSubCategory", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    cmd.Parameters.Add(new SqlParameter("@pSubCatName", subcategory));
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
                using (SqlCommand cmd = new SqlCommand("da.DeleteSubCategory", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        private SubCategory MapToValue(SqlDataReader reader)
        {
            return new SubCategory()
            {
                SubCategoryId = Common.NullableInt("SubCategoryId", reader),
                SubCategoryName = (string)reader["SubCategoryName"],
                CategoryName = (string)reader["CategoryName"],
                IsDeleted = Common.NullableInt("IsDeleted", reader),
                CategoryId = Common.NullableInt("CategoryId", reader)
            };
        }
        private SubCategoryDropDown MapToValueForDorpDown(SqlDataReader reader)
        {
            return new SubCategoryDropDown()
            {
                SubCategoryId = Common.NullableInt("SubCategoryId", reader),
                SubCategoryName = (string)reader["SubCategoryName"],
            };
        }
    }
}
