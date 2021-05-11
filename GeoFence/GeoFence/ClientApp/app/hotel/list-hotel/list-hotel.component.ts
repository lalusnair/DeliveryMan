import { Component, OnInit } from '@angular/core';
import { HotelService } from 'ClientApp/Services/hotel.service';
import { HotelDetailsDTO } from 'ClientApp/app/DTOs/Hotel_DTO';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-hotel',
    templateUrl: './list-hotel.component.html',
    styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {


    private _hotelServ: HotelService;
    public hotelData: HotelDetailsDTO[];
    constructor(private router: Router, hotelServ: HotelService) {
        this._hotelServ = hotelServ;

    }

    ngOnInit() {
        this._hotelServ.GetAllHotels().subscribe(res => {
            this.hotelData = res;
        });
    }

    addHotel(): void {
        this.router.navigate(['AddHotel']);
    };

    deleteHotel(hotel: HotelDetailsDTO): void {
        console.log(hotel);
        this._hotelServ.DeleteHotel(hotel.hotel_Id).subscribe(res => {
            this.hotelData = this.hotelData.filter(u => u !== hotel);
        });
    };

    editHotel(hotel: HotelDetailsDTO): void {
        window.localStorage.removeItem("editUserId");
        window.localStorage.setItem("editUserId", hotel.hotel_Id.toString());
        this.router.navigate(['EditHotel']);
    };

    viewHotel(hotel: HotelDetailsDTO): void {
        window.localStorage.removeItem("editUserId");
        window.localStorage.setItem("editUserId", hotel.hotel_Id.toString());
        this.router.navigate(['ViewHotel']);
    };
}
