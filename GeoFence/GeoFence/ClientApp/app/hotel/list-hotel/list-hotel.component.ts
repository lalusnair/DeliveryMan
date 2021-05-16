import { Component, OnInit } from '@angular/core';
import { HotelService } from 'ClientApp/Services/hotel.service';
import { HotelDetailsDTO } from 'ClientApp/app/DTOs/Hotel_DTO';
import { Router } from '@angular/router';
import { NotificationService } from 'ClientApp/app/services/notification.service';

@Component({
    selector: 'app-list-hotel',
    templateUrl: './list-hotel.component.html',
    styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {


    private _hotelServ: HotelService;
    public hotelData: HotelDetailsDTO[];
    constructor(private router: Router,
        private notification: NotificationService,
        hotelServ: HotelService) {
        this._hotelServ = hotelServ;

    }

    ngOnInit() {
        this._hotelServ.GetAllHotels().subscribe(res => {
            this.hotelData = res;
            console.log(this.hotelData);
        });
    }

    addHotel(): void {
        this.router.navigate(['AddHotel']);
    };

    deleteHotel(hotel: HotelDetailsDTO): void {
        this._hotelServ.DeleteHotel(hotel.hotel_Id).subscribe(res => {
            var idx = this.hotelData.indexOf(hotel);
            hotel.isActive = hotel.isActive == 1 ? 0 : 1;
            this.hotelData[idx] = hotel;
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
