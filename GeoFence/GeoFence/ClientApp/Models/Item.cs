using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Models
{

    public class Item
    {
        public int? ItemId { get; set; }
        public int? HotelId { get; set; }
        public string Image { get; set; }
        public string Hotel_Name { get; set; }
        public string ItemName { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string Ingrediants { get; set; }
        public decimal? SellingPrice { get; set; }
        public decimal? OurPrice { get; set; }
        public decimal? Preparationtime { get; set; }
        public decimal? ItemAvailableTime { get; set; }
        public int? IsActive { get; set; }
    }
}
