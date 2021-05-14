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
var EditHotelComponent = /** @class */ (function () {
    function EditHotelComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
        this.workingDaysArr = [];
        this.DaysArray = [{ name: 'Mon', value: 'Monday' },
            { name: 'Tue', value: 'Tuesday' },
            { name: 'Wed', value: 'Wednesday' },
            { name: 'Thu', value: 'Thursday' },
            { name: 'Fri', value: 'Friday' },
            { name: 'Sat', value: 'Saturday' },
            { name: 'Sun', value: 'Sunday' }];
    }
    EditHotelComponent.prototype.ngOnInit = function () {
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
            isActive: [],
            creationDate: [],
            modifiedDate: [],
            image: [],
            checkArray: this.formBuilder.array([])
        });
        this.apiService.GetHotelById(parseInt(hotelID))
            .subscribe(function (data) {
            console.log(data);
            _this.workingDaysArr = data.workingDays != null ? data.workingDays.split(';') : [];
            var checkArray = _this.editForm.get('checkArray');
            for (var i = 0; i < _this.workingDaysArr.length; i++) {
                checkArray.push(new FormControl(_this.workingDaysArr[i]));
            }
            _this.editForm.patchValue(data);
            _this.editForm.setValue(data);
        });
    };
    EditHotelComponent.prototype.isChecked = function (val) {
        var checkArray = this.editForm.get('checkArray');
        var res = false;
        checkArray.controls.forEach(function (item) {
            if (item.value == val) {
                res = true;
            }
        });
        return res;
    };
    EditHotelComponent.prototype.onCheckboxChange = function (e) {
        var checkArray = this.editForm.get('checkArray');
        if (e.target.checked) {
            checkArray.push(new FormControl(e.target.value));
        }
        else {
            var i_1 = 0;
            checkArray.controls.forEach(function (item) {
                if (item.value == e.target.value) {
                    checkArray.removeAt(i_1);
                    return;
                }
                i_1++;
            });
        }
        var value = '';
        checkArray.controls.forEach(function (item) {
            value = value + item.value + ';';
        });
        value = value.substring(0, value.lastIndexOf(';'));
        this.editForm.controls["workingDays"].setValue(value);
    };
    EditHotelComponent.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        console.log(this.editForm.value);
        this.apiService.UpdateHotel(this.editForm.value)
            .subscribe(function (data) {
            _this.router.navigate(['ListHotel']);
        });
    };
    EditHotelComponent.prototype.backToList = function () {
        this.router.navigate(['ListHotel']);
    };
    EditHotelComponent = __decorate([
        Component({
            selector: 'app-edit-hotel',
            templateUrl: './edit-hotel.component.html',
            styleUrls: ['./edit-hotel.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, HotelService])
    ], EditHotelComponent);
    return EditHotelComponent;
}());
export { EditHotelComponent };
//# sourceMappingURL=edit-hotel.component.js.map