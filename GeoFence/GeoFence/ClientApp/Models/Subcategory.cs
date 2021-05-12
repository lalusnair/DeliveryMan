using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Models
{
    public class SubCategory
    {
        public int? SubCategoryId { get; set; }
        public int? CategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public int? IsDeleted { get; set; }

    }
    public class SubCategoryDropDown
    {
        public int? SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
    }
}
