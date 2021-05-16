using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoFence.ClientApp.Data;
using GeoFence.ClientApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace GeoFence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly ILogger _logger;

        private readonly HotelRepository _hotelRepository;
        private readonly CategoryRepository _categoryRepository;
        private readonly SubCategoryRepository _subCategoryRepository;
        private readonly ItemRepository _itemRepository;
        public DataController(HotelRepository hotelRepository,
                              CategoryRepository categoryRepository,
                              ItemRepository itemRepository,
                              SubCategoryRepository subCategoryRepository,
                              ILoggerFactory logFactory)
        {
            _hotelRepository = hotelRepository;
            _categoryRepository = categoryRepository;
            _subCategoryRepository = subCategoryRepository;
            _itemRepository = itemRepository;

            _logger = logFactory.CreateLogger<DataController>();
        }

        #region Hotel

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllHotels")]
        public async Task<List<HotelDTO>> GetAllHotelDetails()
        {
            try
            {
                var response = await _hotelRepository.GetAll();
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllHotelDetails Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetHotelsForDropDown")]
        public async Task<List<HotelDropDown>> GetHotelsForDropDown()
        {
            try
            {
                var response = await _hotelRepository.GetHotelsForDropdown();
                if (response == null) { return null; }
                return response;

            }
            catch (Exception ex)
            {
                _logger.LogError($"GetHotelsForDropDown Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }


        [HttpPost("HotelDetails/{id}")]
        public async Task<ActionResult<HotelDTO>> Get([FromBody] int id)
        {
            try
            {
                var response = await _hotelRepository.GetByID(id);
                if (response == null) { return NotFound(); }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("DeleteHotel/{id}")]
        public async Task<ActionResult<bool>> DeleteHotel([FromBody] int id)
        {
            try
            {
                var response = await _hotelRepository.DeleteByID(id);
                return true;

            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteHotel Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("CreateHotel")]
        public async Task<ActionResult<bool>> CreateHotel([FromBody] HotelDTO hotelDetails)
        {
            try
            {
                string hotelDetailJson = JsonConvert.SerializeObject(hotelDetails);
                //string hotelDetailJson = "{\"HotelName\":\"Paraqon\",\"OwnerName\":\"ABC\",\"OwnerAddress\":\"Kochi\",\"HotelAddress\":\"Lulumall,Kochi\",\"ContactPhone1\":\"1234567890\",\"ContactPhone2\":\"1234567890\",\"ContactPhone3\":\"1234567890\",\"ContactPhone4\":\"1234567890\",\"OpeningTime\":\"9:00\",\"ClosingTime\":\"10:00\",\"HotelType\":\"Both\",\"SafetyCertNo\":\"234566\",\"Lattitude\":5.45667,\"Longitude\":2.9866,\"Description\":\"Food store\",\"BankName\":\"SBI\",\"IFSCCode\":\"SBIN000344\",\"GST\":\"465722\",\"WorkingDays\":\"Mon-Sat\",\"Email\":\"paraqon@gmail.com\",\"LandMark\":\"Lulu\",\"Website\":\"www.paraqon.com\",\"HotelRating\":5,\"IsParkingAvailable\":1,\"IsOutdoorAvailable\":0}";
                var response = await _hotelRepository.Insert(hotelDetailJson);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"CreateHotel Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("UpdateHotel")]
        public async Task<ActionResult<bool>> UpdateHotel([FromBody] HotelDTO hotelDetails)
        {
            try
            {
                string hotelDetailJson = JsonConvert.SerializeObject(hotelDetails);
                //string hotelDetailJson = "{\"HotelName\":\"Paraqon\",\"OwnerName\":\"ABC\",\"OwnerAddress\":\"Kochi\",\"HotelAddress\":\"Lulumall,Kochi\",\"ContactPhone1\":\"1234567890\",\"ContactPhone2\":\"1234567890\",\"ContactPhone3\":\"1234567890\",\"ContactPhone4\":\"1234567890\",\"OpeningTime\":\"9:00\",\"ClosingTime\":\"10:00\",\"HotelType\":\"Both\",\"SafetyCertNo\":\"234566\",\"Lattitude\":5.45667,\"Longitude\":2.9866,\"Description\":\"Food store\",\"BankName\":\"SBI\",\"IFSCCode\":\"SBIN000344\",\"GST\":\"465722\",\"WorkingDays\":\"Mon-Sat\",\"Email\":\"paraqon@gmail.com\",\"LandMark\":\"Lulu\",\"Website\":\"www.paraqon.com\",\"HotelRating\":5,\"IsParkingAvailable\":1,\"IsOutdoorAvailable\":0}";
                var response = await _hotelRepository.Edit(hotelDetailJson, (Int32)hotelDetails.Hotel_Id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"UpdateHotel Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }
        #endregion Hotel

        #region Category
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllCategories")]
        public async Task<List<Category>> GetAllCategories()
        {
            try
            {
                var response = await _categoryRepository.GetAll();
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllCategories Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetCategoriesForDropDown")]
        public async Task<List<CategoryDropDown>> GetCategoriesForDropDown()
        {
            try
            {
                var response = await _categoryRepository.GetCategoriesForDropdown();
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllCategories Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("Category/{id}")]
        public async Task<ActionResult<Category>> GetCategory([FromBody] int id)
        {
            try
            {
                var response = await _categoryRepository.GetByID(id);
                if (response == null) { return NotFound(); }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }

        }

        [HttpPost("DeleteCategory/{id}")]
        public async Task<ActionResult<bool>> DeleteCategory([FromBody] int id)
        {


            try
            {
                var response = await _categoryRepository.DeleteByID(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("CreateCategory")]
        public async Task<ActionResult<bool>> CreateCategory([FromBody] string categoryName)
        {


            try
            {
                var response = await _categoryRepository.Insert(categoryName);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"CreateCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("UpdateCategory")]
        public async Task<ActionResult<bool>> updateCategory([FromBody] Category categoryDetails)
        {


            try
            {
                string hotelDetailJson = JsonConvert.SerializeObject(categoryDetails);
                var response = await _categoryRepository.Edit(categoryDetails.CategoryName, (Int32)categoryDetails.CategoryId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"updateCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }
        #endregion Category

        #region SubCategory
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllSubCategories")]
        public async Task<List<SubCategory>> GetAllSubCategories()
        {
            try
            {
                var response = await _subCategoryRepository.GetAll();
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllSubCategories Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }

        }

        [HttpPost("GetSubCategoriesForDropDown/{id}")]
        public async Task<List<SubCategoryDropDown>> GetSubCategoriesForDropDown([FromBody] int id)
        {
            try
            {
                var response = await _subCategoryRepository.GetSubCategoriesForDropdown(id);
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetSubCategoriesForDropDown Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }

        }

        [HttpPost("SubCategory/{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory([FromBody] int id)
        {
            try
            {
                var response = await _subCategoryRepository.GetByID(id);
                if (response == null) { return NotFound(); }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetSubCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }

        }

        [HttpPost("DeleteSubCategory/{id}")]
        public async Task<ActionResult<bool>> DeleteSubCategory([FromBody] int id)
        {
            try
            {
                var response = await _subCategoryRepository.DeleteByID(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteSubCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("CreateSubCategory")]
        public async Task<ActionResult<bool>> CreateSubCategory([FromBody] SubCategory subCategory)
        {
            try
            {
                var response = await _subCategoryRepository.Insert((int)subCategory.CategoryId, subCategory.SubCategoryName);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"CreateSubCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("UpdateSubCategory")]
        public async Task<ActionResult<bool>> updateSubCategory([FromBody] SubCategory subCategory)
        {
            try
            {
                var response = await _subCategoryRepository.Edit(subCategory.SubCategoryName, (Int32)subCategory.CategoryId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"updateSubCategory Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }
        #endregion SubCategory

        #region Item
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllItems")]
        public async Task<List<Item>> GetAllItems()
        {
            try
            {
                var response = await _itemRepository.GetAll();
                if (response == null) { return null; }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllItems Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("Item/{id}")]
        public async Task<ActionResult<Item>> GetItem([FromBody] int id)
        {
            try
            {
                var response = await _itemRepository.GetByID(id);
                if (response == null) { return NotFound(); }
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetItem Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("DeleteItem/{id}")]
        public async Task<ActionResult<bool>> DeleteItem([FromBody] int id)
        {

            try
            {
                var response = await _itemRepository.DeleteByID(id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"DeleteItem Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }

        [HttpPost("CreateItem")]
        public async Task<ActionResult<bool>> CreateItem([FromBody] Item item)
        {
            try
            {
                var itemJson = JsonConvert.SerializeObject(item);
                var response = await _itemRepository.Insert(itemJson);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"CreateItem Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }

        }


        [HttpPost("UpdateItem")]
        public async Task<ActionResult<bool>> UpdateItem([FromBody] Item item)
        {
            try
            {
                var itemJson = JsonConvert.SerializeObject(item);
                var response = await _itemRepository.Edit(itemJson, (Int32)item.ItemId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"UpdateItem Failed : {ex.Message} :::: {ex.StackTrace}");
                return null;
            }
        }
        #endregion Item

    }
}
