using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoFence.ClientApp.Models
{
    //public class HotelDTO
    //{
    //    public int ? Hotel_Id { get; set; }
    //    public string Hotel_Name { get; set; }
    //    public string Owner_Name { get; set; }
    //    public string Owner_Address { get; set; }
    //    public string Hotel_Address { get; set; }
    //    public string ContactPhone1 { get; set; }
    //    public string ContactPhone2 { get; set; }
    //    public string ContactPhone3 { get; set; }
    //    public string ContactPhone4 { get; set; }
    //    public TimeSpan ? OpeningTime { get; set; }
    //    public TimeSpan ? ClosingTime { get; set; }
    //    public string HotelType { get; set; }
    //    public string SafetyCertificateNumber { get; set; }
    //    public decimal ? Lattitude { get; set; }
    //    public decimal ? Longitude { get; set; }
    //    public string Description { get; set; }
    //    public string Bank_Name { get; set; }
    //    public string IFSC_Code { get; set; }
    //    public string GST { get; set; }
    //    public string WorkingDays { get; set; }
    //    public string Email { get; set; }
    //    public string LandMark { get; set; }
    //    public string Website { get; set; }
    //    public int ? HotelRating { get; set; }
    //    public int ? IsParkingAvailable { get; set; }
    //    public int ? IsOutdoorAvailable { get; set; }
    //    public int ? IsActive { get; set; }
    //    public DateTime ? CreationDate { get; set; }
    //    public DateTime ? ModifiedDate { get; set; }
    //}

    public class HotelDTO
    {
        public int? Hotel_Id { get; set; }
        public string HotelName { get; set; }
        public string OwnerName { get; set; }
        public string OwnerAddress { get; set; }
        public string HotelAddress { get; set; }
        public string ContactPhone1 { get; set; }
        public string ContactPhone2 { get; set; }
        public string ContactPhone3 { get; set; }
        public string ContactPhone4 { get; set; }
        public decimal? OpeningTime { get; set; }
        public decimal? ClosingTime { get; set; }
        public string HotelType { get; set; }
        public string SafetyCertNo { get; set; }
        public decimal? Lattitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Description { get; set; }
        public string BankName { get; set; }
        public string IFSCCode { get; set; }
        public string GST { get; set; }
        public string WorkingDays { get; set; }
        public string Email { get; set; }
        public string LandMark { get; set; }
        public string Website { get; set; }
        public int? HotelRating { get; set; }
        public int? IsParkingAvailable { get; set; }
        public int? IsOutdoorAvailable { get; set; }
        public int? IsActive { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Image { get; set; }

    }

    public class HotelDropDown
    {
        public int? Hotel_Id { get; set; }
        public string HotelName { get; set; }

    }
}
