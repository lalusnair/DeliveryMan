using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Models
{
    public class Category
    {
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? IsDeleted { get; set; }

    }

    public class CategoryDropDown
    {
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}
