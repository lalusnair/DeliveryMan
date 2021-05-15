var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HotelDetailsClass } from 'ClientApp/app/DTOs/Hotel_DTO';
var HotelService = /** @class */ (function () {
    function HotelService(http, baseUrl) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }
    HotelService.prototype.GetAllHotels = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetAllHotels');
    };
    HotelService.prototype.GetHotelById = function (id) {
        var para = new HttpParams().set('id', id.toString());
        return this.Http.post(this.BaseURL + 'api/Data/HotelDetails/id=', id);
    };
    HotelService.prototype.CreateHotel = function (hotel) {
        var details = new HotelDetailsClass();
        details.BankName = hotel.bank_Name;
        details.ClosingTime = hotel.closingTime;
        details.ContactPhone1 = hotel.contactPhone1;
        details.ContactPhone2 = hotel.contactPhone2;
        details.ContactPhone3 = hotel.contactPhone3;
        details.ContactPhone4 = hotel.contactPhone4;
        details.Description = hotel.description;
        details.Email = hotel.email;
        details.GST = hotel.gST;
        details.HotelAddress = hotel.hotel_Address;
        details.HotelName = hotel.hotel_Name;
        details.HotelRating = hotel.hotelRating;
        details.HotelType = hotel.hotelType;
        details.IFSCCode = hotel.iFSC_Code;
        details.IsOutdoorAvailable = hotel.isOutdoorAvailable;
        details.IsParkingAvailable = hotel.isParkingAvailable;
        details.LandMark = hotel.landMark;
        details.Lattitude = hotel.lattitude;
        details.Longitude = hotel.longitude;
        details.OpeningTime = hotel.openingTime;
        details.OwnerAddress = hotel.owner_Address;
        details.OwnerName = hotel.owner_Name;
        details.SafetyCertNo = hotel.safetyCertificateNumber;
        details.Website = hotel.website;
        details.WorkingDays = hotel.workingDays;
        details.Image = hotel.image;
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(details);
        return this.Http.post(this.BaseURL + 'api/Data/CreateHotel', body, { 'headers': headers });
    };
    HotelService.prototype.UpdateHotel = function (hotel) {
        //debugger;
        //var details: HotelDetailsDTO = new HotelDetailsDTO();
        //details.bank_Name = hotel.BankName;
        //details.closingTime = hotel.ClosingTime;
        //details.contactPhone1 = hotel.ContactPhone1;
        //details.contactPhone2 = hotel.ContactPhone2;
        //details.contactPhone3 = hotel.ContactPhone3;
        //details.contactPhone4 = hotel.ContactPhone4;
        //details.description = hotel.Description;
        //details.email = hotel.Email;
        //details.gST = hotel.GST;
        //details.det = hotel.HotelAddress;
        //details.details_Name = hotel.HotelName;
        //details.detailsRating = hotel.HotelRating;
        //details.detailsType = hotel.HotelType;
        //details.iFSC_Code = hotel.IFSCCode;
        //details.isOutdoorAvailable = hotel.IsOutdoorAvailable;
        //details.isParkingAvailable = hotel.IsParkingAvailable;
        //details.landMark = hotel.LandMark;
        //details.lattitude = hotel.Lattitude;
        //details.longitude = hotel.Longitude;
        //details.openingTime = hotel.OpeningTime;
        //details.owner_Address = hotel.OwnerAddress;
        //details.owner_Name = hotel.OwnerName;
        //details.safetyCertificateNumber = hotel.SafetyCertNo;
        //details.website = hotel.Website;
        //details.workingDays = hotel.WorkingDays;
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(hotel);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateHotel/', body, { 'headers': headers });
    };
    HotelService.prototype.DeleteHotel = function (id) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteHotel/id=', id);
    };
    HotelService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], HotelService);
    return HotelService;
}());
export { HotelService };
//# sourceMappingURL=hotel.service.js.map