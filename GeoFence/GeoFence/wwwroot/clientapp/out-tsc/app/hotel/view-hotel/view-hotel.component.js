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
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HotelService } from "../../../Services/hotel.service";
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';
var ViewHotelComponent = /** @class */ (function () {
    function ViewHotelComponent(formBuilder, router, func, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.func = func;
        this.apiService = apiService;
        this.cardImageBase64arr = [];
        this.workingDaysArr = [];
        this.DaysArray = [{ name: 'Mon', value: 'Monday' },
            { name: 'Tue', value: 'Tuesday' },
            { name: 'Wed', value: 'Wednesday' },
            { name: 'Thu', value: 'Thursday' },
            { name: 'Fri', value: 'Friday' },
            { name: 'Sat', value: 'Saturday' },
            { name: 'Sun', value: 'Sunday' }];
    }
    ViewHotelComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hotelID = window.localStorage.getItem("editUserId");
        if (!hotelID) {
            alert("Invalid action.");
            this.router.navigate(['ListHotel']);
            return;
        }
        this.editForm = this.formBuilder.group({
            hotel_Id: [],
            hotelName: ['', Validators.required],
            ownerName: ['', Validators.required],
            ownerAddress: [],
            hotelAddress: ['', Validators.required],
            contactPhone1: ['', Validators.required],
            contactPhone2: ['', Validators.required],
            contactPhone3: [],
            contactPhone4: [],
            openingTime: ['', Validators.required],
            closingTime: ['', Validators.required],
            hotelType: ['', Validators.required],
            safetyCertNo: ['', Validators.required],
            lattitude: ['', Validators.required],
            longitude: ['', Validators.required],
            description: [],
            bankName: ['', Validators.required],
            ifscCode: ['', Validators.required],
            gst: ['', Validators.required],
            workingDays: ['', Validators.required],
            email: ['', Validators.required],
            landMark: [],
            website: [],
            hotelRating: [],
            isParkingAvailable: ['', Validators.required],
            isOutdoorAvailable: ['', Validators.required],
            isActive: ['', Validators.required],
            creationDate: [],
            modifiedDate: [],
            image: [],
            checkArray: this.formBuilder.array([])
        });
        this.apiService.GetHotelById(parseInt(hotelID))
            .subscribe(function (data) {
            console.log(data);
            _this.cardImageBase64arr = data.image != null ? data.image.split('^') : [];
            _this.workingDaysArr = data.workingDays != null ? data.workingDays.split(';') : [];
            var checkArray = _this.editForm.get('checkArray');
            for (var i = 0; i < _this.workingDaysArr.length; i++) {
                checkArray.push(new FormControl(_this.workingDaysArr[i]));
            }
            _this.editForm.patchValue(data);
        });
    };
    ViewHotelComponent.prototype.backToList = function () {
        this.router.navigate(['ListHotel']);
    };
    ViewHotelComponent.prototype.isChecked = function (val) {
        var checkArray = this.editForm.get('checkArray');
        var res = false;
        checkArray.controls.forEach(function (item) {
            if (item.value == val) {
                res = true;
            }
        });
        return res;
    };
    ViewHotelComponent.prototype.ImageClick = function (image64) {
        this.func.openImageInNewWindow(image64);
    };
    ViewHotelComponent = __decorate([
        Component({
            selector: 'app-view-hotel',
            templateUrl: './view-hotel.component.html',
            styleUrls: ['./view-hotel.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            FuncServiceService,
            HotelService])
    ], ViewHotelComponent);
    return ViewHotelComponent;
}());
export { ViewHotelComponent };
//# sourceMappingURL=view-hotel.component.js.map