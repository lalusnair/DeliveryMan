var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HotelService } from 'ClientApp/Services/hotel.service';
import { Router } from '@angular/router';
var ListHotelComponent = /** @class */ (function () {
    function ListHotelComponent(router, hotelServ) {
        this.router = router;
        this._hotelServ = hotelServ;
    }
    ListHotelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._hotelServ.GetAllHotels().subscribe(function (res) {
            _this.hotelData = res;
            console.log(_this.hotelData);
        });
    };
    ListHotelComponent.prototype.addHotel = function () {
        this.router.navigate(['AddHotel']);
    };
    ;
    ListHotelComponent.prototype.deleteHotel = function (hotel) {
        var _this = this;
        this._hotelServ.DeleteHotel(hotel.hotel_Id).subscribe(function (res) {
            var idx = _this.hotelData.indexOf(hotel);
            hotel.isActive = hotel.isActive == 1 ? 0 : 1;
            _this.hotelData[idx] = hotel;
        });
    };
    ;
    ListHotelComponent.prototype.editHotel = function (hotel) {
        window.localStorage.removeItem("editUserId");
        window.localStorage.setItem("editUserId", hotel.hotel_Id.toString());
        this.router.navigate(['EditHotel']);
    };
    ;
    ListHotelComponent.prototype.viewHotel = function (hotel) {
        window.localStorage.removeItem("editUserId");
        window.localStorage.setItem("editUserId", hotel.hotel_Id.toString());
        this.router.navigate(['ViewHotel']);
    };
    ;
    ListHotelComponent = __decorate([
        Component({
            selector: 'app-list-hotel',
            templateUrl: './list-hotel.component.html',
            styleUrls: ['./list-hotel.component.css']
        }),
        __metadata("design:paramtypes", [Router, HotelService])
    ], ListHotelComponent);
    return ListHotelComponent;
}());
export { ListHotelComponent };
//# sourceMappingURL=list-hotel.component.js.map