import { Component, Inject, InjectionToken, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HotelDetailsDTO } from 'ClientApp/app/DTOs/Hotel_DTO';
import { HotelDetailsClass } from 'ClientApp/app/DTOs/Hotel_DTO';


@Injectable({
    providedIn: 'root'
})
export class HotelService {
    public Http: HttpClient;
    public BaseURL: string;
    public res: string[];
    public subtitle: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, ) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }

    GetAllHotels() {
        return this.Http.get<HotelDetailsDTO[]>(this.BaseURL + 'api/Data/GetAllHotels');
    }

    GetHotelById(id: number) {
        let para = new HttpParams().set('id', id.toString());
        return this.Http.post<HotelDetailsDTO>(this.BaseURL + 'api/Data/HotelDetails/id=', id);
    }

    CreateHotel(hotel: HotelDetailsDTO) {
        var details: HotelDetailsClass = new HotelDetailsClass();
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
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(details);
        return this.Http.post(this.BaseURL + 'api/Data/CreateHotel', body, { 'headers': headers });

    }

    UpdateHotel(hotel: HotelDetailsClass) {
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

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(hotel);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateHotel/', body, { 'headers': headers });

    }

    DeleteHotel(id: number) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteHotel/id=', id);
    }
}
