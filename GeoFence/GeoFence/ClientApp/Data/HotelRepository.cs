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
    public class HotelRepository
    {
        private readonly string _connectionString;

        public HotelRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<List<HotelDTO>> GetAll()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetAllHotelDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<HotelDTO>();
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

        public async Task<List<HotelDropDown>> GetHotelsForDropdown()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.SelectHotel", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<HotelDropDown>();
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

        public async Task<HotelDTO> GetByID(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.GetHotelDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    HotelDTO response = null;
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

        public async Task<bool> Insert(string hotelJson)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("da.CreateHotelDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", 4));
                    cmd.Parameters.Add(new SqlParameter("@pHotelInfoJson", hotelJson));
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
                using (SqlCommand cmd = new SqlCommand("da.UpdateHotelDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    cmd.Parameters.Add(new SqlParameter("@pHotelInfoJson", hotelJson));
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
                using (SqlCommand cmd = new SqlCommand("da.DeleteHotelDetails", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", id));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }
            }
        }

        private HotelDTO MapToValue(SqlDataReader reader)
        {
            return new HotelDTO()
            {
                ModifiedDate = Common.NullableDate("ModifiedDate", reader),
                CreationDate = Common.NullableDate("CreationDate", reader),
                Longitude = Common.NullableDecimal("Longitude", reader),
                Lattitude = Common.NullableDecimal("Lattitude", reader),
                IsParkingAvailable = Common.NullableInt("IsParkingAvailable", reader),
                IsOutdoorAvailable = Common.NullableInt("IsOutdoorAvailable", reader),
                IsActive = Common.NullableInt("IsActive", reader),
                HotelRating = Common.NullableInt("HotelRating", reader),
                Hotel_Id = Common.NullableInt("Hotel_Id", reader),
                WorkingDays = Common.NullableString("WorkingDays",reader),
                Website = Common.NullableString("Website", reader),
                SafetyCertNo = Common.NullableString("SafetyCertNo", reader),
                OwnerName = Common.NullableString("OwnerName", reader),
                OwnerAddress = Common.NullableString("OwnerAddress", reader),
                LandMark = Common.NullableString("LandMark", reader),
                IFSCCode = Common.NullableString("IFSCCode", reader),
                HotelType = Common.NullableString("HotelType", reader),
                HotelName = Common.NullableString("HotelName", reader),
                HotelAddress = Common.NullableString("HotelAddress", reader),
                GST = Common.NullableString("GST", reader),
                Email = Common.NullableString("Email", reader),
                Image = Common.NullableString("Image", reader),
                Description = Common.NullableString("Description", reader),
                ContactPhone4 = Common.NullableString("ContactPhone4", reader),
                ContactPhone3 = Common.NullableString("ContactPhone3", reader),
                ContactPhone2 = Common.NullableString("ContactPhone2", reader),
                ContactPhone1 = Common.NullableString("ContactPhone1", reader),
                BankName = Common.NullableString("BankName", reader),
                OpeningTime = Common.NullableDecimal("OpeningTime", reader),
                ClosingTime = Common.NullableDecimal("ClosingTime", reader)
            };
        }
        private HotelDropDown MapToValueForDorpDown(SqlDataReader reader)
        {
            return new HotelDropDown()
            {
                Hotel_Id = Common.NullableInt("Hotel_Id", reader),
                HotelName = (string)reader["Hotel_Name"],
            };
        }
    }
}
