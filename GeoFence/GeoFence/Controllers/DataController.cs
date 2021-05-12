using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoFence.ClientApp.Data;
using GeoFence.ClientApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GeoFence.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly HotelRepository _hotelRepository;
        private readonly CategoryRepository _categoryRepository;
        private readonly SubCategoryRepository _subCategoryRepository;
        private readonly ItemRepository _itemRepository;
        public DataController(HotelRepository hotelRepository,
                              CategoryRepository categoryRepository,
                              ItemRepository itemRepository,
                              SubCategoryRepository subCategoryRepository)
        {
            _hotelRepository = hotelRepository;
            _categoryRepository = categoryRepository;
            _subCategoryRepository = subCategoryRepository;
            _itemRepository = itemRepository;
        }

        #region Hotel

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllHotels")]
        public async Task<List<HotelDTO>> GetAllHotelDetails()
        {
            var response = await _hotelRepository.GetAll();
            if (response == null) { return null; }
            return response;
        }

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetHotelsForDropDown")]
        public async Task<List<HotelDropDown>> GetHotelsForDropDown()
        {
            var response = await _hotelRepository.GetHotelsForDropdown();
            if (response == null) { return null; }
            return response;
        }


        [HttpPost("HotelDetails/{id}")]
        public async Task<ActionResult<HotelDTO>> Get([FromBody]int id)
        {
            var response = await _hotelRepository.GetByID(id);
            if (response == null) { return NotFound(); }
            return response;
        }

        [HttpPost("DeleteHotel/{id}")]
        public async Task<ActionResult<bool>> DeleteHotel([FromBody] int id)
        {
            var response = await _hotelRepository.DeleteByID(id);
            return true;
        }

        [HttpPost("CreateHotel")]
        public async Task<ActionResult<bool>> CreateHotel([FromBody]HotelDTO hotelDetails)
        {
            string hotelDetailJson = JsonConvert.SerializeObject(hotelDetails);
            //string hotelDetailJson = "{\"HotelName\":\"Paraqon\",\"OwnerName\":\"ABC\",\"OwnerAddress\":\"Kochi\",\"HotelAddress\":\"Lulumall,Kochi\",\"ContactPhone1\":\"1234567890\",\"ContactPhone2\":\"1234567890\",\"ContactPhone3\":\"1234567890\",\"ContactPhone4\":\"1234567890\",\"OpeningTime\":\"9:00\",\"ClosingTime\":\"10:00\",\"HotelType\":\"Both\",\"SafetyCertNo\":\"234566\",\"Lattitude\":5.45667,\"Longitude\":2.9866,\"Description\":\"Food store\",\"BankName\":\"SBI\",\"IFSCCode\":\"SBIN000344\",\"GST\":\"465722\",\"WorkingDays\":\"Mon-Sat\",\"Email\":\"paraqon@gmail.com\",\"LandMark\":\"Lulu\",\"Website\":\"www.paraqon.com\",\"HotelRating\":5,\"IsParkingAvailable\":1,\"IsOutdoorAvailable\":0}";
            var response = await _hotelRepository.Insert(hotelDetailJson);
            return true;
        }

        [HttpPost("UpdateHotel")]
        public async Task<ActionResult<bool>> UpdateHotel([FromBody]HotelDTO hotelDetails)
        {
            string hotelDetailJson = JsonConvert.SerializeObject(hotelDetails);
            //string hotelDetailJson = "{\"HotelName\":\"Paraqon\",\"OwnerName\":\"ABC\",\"OwnerAddress\":\"Kochi\",\"HotelAddress\":\"Lulumall,Kochi\",\"ContactPhone1\":\"1234567890\",\"ContactPhone2\":\"1234567890\",\"ContactPhone3\":\"1234567890\",\"ContactPhone4\":\"1234567890\",\"OpeningTime\":\"9:00\",\"ClosingTime\":\"10:00\",\"HotelType\":\"Both\",\"SafetyCertNo\":\"234566\",\"Lattitude\":5.45667,\"Longitude\":2.9866,\"Description\":\"Food store\",\"BankName\":\"SBI\",\"IFSCCode\":\"SBIN000344\",\"GST\":\"465722\",\"WorkingDays\":\"Mon-Sat\",\"Email\":\"paraqon@gmail.com\",\"LandMark\":\"Lulu\",\"Website\":\"www.paraqon.com\",\"HotelRating\":5,\"IsParkingAvailable\":1,\"IsOutdoorAvailable\":0}";
            var response = await _hotelRepository.Edit(hotelDetailJson, (Int32)hotelDetails.Hotel_Id);
            return true;
        }
        #endregion Hotel

        #region Category
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllCategories")]
        public async Task<List<Category>> GetAllCategories()
        {
            var response = await _categoryRepository.GetAll();
            if (response == null) { return null; }
            return response;
        }

        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetCategoriesForDropDown")]
        public async Task<List<CategoryDropDown>> GetCategoriesForDropDown()
        {
            var response = await _categoryRepository.GetCategoriesForDropdown();
            if (response == null) { return null; }
            return response;
        }

        [HttpPost("Category/{id}")]
        public async Task<ActionResult<Category>> GetCategory([FromBody]int id)
        {
            var response = await _categoryRepository.GetByID(id);
            if (response == null) { return NotFound(); }
            return response;
        }
        
        [HttpPost("DeleteCategory/{id}")]
        public async Task<ActionResult<bool>> DeleteCategory([FromBody] int id)
        {
            var response = await _categoryRepository.DeleteByID(id);
            return true;
        }

        [HttpPost("CreateCategory")]
        public async Task<ActionResult<bool>> CreateCategory([FromBody]string categoryName)
        {
            var response = await _categoryRepository.Insert(categoryName);
            return true;
        }
        
        [HttpPost("UpdateCategory")]
        public async Task<ActionResult<bool>> updateCategory([FromBody]Category categoryDetails)
        {
            string hotelDetailJson = JsonConvert.SerializeObject(categoryDetails);
            var response = await _categoryRepository.Edit(categoryDetails.CategoryName, (Int32)categoryDetails.CategoryId);
            return true;
        }
        #endregion Category

        #region SubCategory
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllSubCategories")]
        public async Task<List<SubCategory>> GetAllSubCategories()
        {
            var response = await _subCategoryRepository.GetAll();
            if (response == null) { return null; }
            return response;
        }

        [HttpPost("GetSubCategoriesForDropDown/{id}")]
        public async Task<List<SubCategoryDropDown>> GetSubCategoriesForDropDown([FromBody]int id)
        {
            var response = await _subCategoryRepository.GetSubCategoriesForDropdown(id);
            if (response == null) { return null; }
            return response;
        }

        [HttpPost("SubCategory/{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory([FromBody]int id)
        {
            var response = await _subCategoryRepository.GetByID(id);
            if (response == null) { return NotFound(); }
            return response;
        }
        
        [HttpPost("DeleteSubCategory/{id}")]
        public async Task<ActionResult<bool>> DeleteSubCategory([FromBody] int id)
        {
            var response = await _subCategoryRepository.DeleteByID(id);
            return true;
        }

        [HttpPost("CreateSubCategory")]
        public async Task<ActionResult<bool>> CreateSubCategory([FromBody]SubCategory subCategory)
        {
            var response = await _subCategoryRepository.Insert((int)subCategory.CategoryId, subCategory.SubCategoryName);
            return true;
        }
        
        [HttpPost("UpdateSubCategory")]
        public async Task<ActionResult<bool>> updateSubCategory([FromBody]SubCategory subCategory)
        {
            var response = await _subCategoryRepository.Edit(subCategory.SubCategoryName, (Int32)subCategory.CategoryId);
            return true;
        }
        #endregion SubCategory

        #region Item
        [HttpGet]
        [EnableCors("AllowOrigin")]
        [Route("GetAllItems")]
        public async Task<List<Item>> GetAllItems()
        {
            var response = await _itemRepository.GetAll();
            if (response == null) { return null; }
            return response;
        }
        
        [HttpPost("Item/{id}")]
        public async Task<ActionResult<Item>> GetItem([FromBody]int id)
        {
            var response = await _itemRepository.GetByID(id);
            if (response == null) { return NotFound(); }
            return response;
        }

        [HttpPost("DeleteItem/{id}")]
        public async Task<ActionResult<bool>> DeleteItem([FromBody] int id)
        {
            var response = await _itemRepository.DeleteByID(id);
            return true;
        }

        [HttpPost("CreateItem")]
        public async Task<ActionResult<bool>> CreateItem([FromBody]Item item)
        {
            var itemJson = JsonConvert.SerializeObject(item);
            var response = await _itemRepository.Insert(itemJson);
            return true;
        }


        [HttpPost("UpdateItem")]
        public async Task<ActionResult<bool>> UpdateItem([FromBody]Item item)
        {
            var itemJson = JsonConvert.SerializeObject(item);
            var response = await _itemRepository.Edit(itemJson,(Int32)item.ItemId);
            return true;
        }
        #endregion Item

    }
}
