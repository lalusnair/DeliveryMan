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
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';
import { NotificationService } from 'ClientApp/app/services/notification.service';
var AddHotelComponent = /** @class */ (function () {
    function AddHotelComponent(formBuilder, router, func, notification, sanitizer, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.func = func;
        this.notification = notification;
        this.sanitizer = sanitizer;
        this.apiService = apiService;
        this.cardImageBase64arr = [];
        this.DaysArray = [{ name: 'Mon', value: 'Monday' },
            { name: 'Tue', value: 'Tuesday' },
            { name: 'Wed', value: 'Wednesday' },
            { name: 'Thu', value: 'Thursday' },
            { name: 'Fri', value: 'Friday' },
            { name: 'Sat', value: 'Saturday' },
            { name: 'Sun', value: 'Sunday' }];
    }
    AddHotelComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            hotel_Id: [],
            hotel_Name: ['', Validators.required],
            owner_Name: ['', Validators.required],
            owner_Address: [],
            hotel_Address: ['', Validators.required],
            contactPhone1: ['', Validators.required],
            contactPhone2: ['', Validators.required],
            contactPhone3: [],
            contactPhone4: [],
            openingTime: ['', Validators.required],
            closingTime: ['', Validators.required],
            hotelType: ['', Validators.required],
            safetyCertificateNumber: ['', Validators.required],
            lattitude: ['', Validators.required],
            longitude: ['', Validators.required],
            description: [],
            bank_Name: ['', Validators.required],
            iFSC_Code: ['', Validators.required],
            gST: ['', Validators.required],
            workingDays: ['', Validators.required],
            email: ['', Validators.required],
            landMark: [],
            website: [],
            hotelRating: [],
            isParkingAvailable: ['', Validators.required],
            isOutdoorAvailable: ['', Validators.required],
            image: [],
            checkArray: this.formBuilder.array([])
        });
    };
    AddHotelComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.addForm.valid) {
            console.log(this.addForm.value);
            this.apiService.CreateHotel(this.addForm.value)
                .subscribe(function (data) {
                _this.router.navigate(['ListHotel']);
            });
        }
        else {
            alert("detailsz");
        }
    };
    AddHotelComponent.prototype.onCheckboxChange = function (e) {
        var checkArray = this.addForm.get('checkArray');
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
        this.addForm.controls["workingDays"].setValue(value);
    };
    AddHotelComponent.prototype.backToList = function () {
        this.router.navigate(['ListHotel']);
    };
    AddHotelComponent.prototype.DeleteImage = function (image) {
        this.cardImageBase64arr.splice(this.cardImageBase64arr.indexOf(image), 1);
        var imageToDB = '';
        for (var i = 0; i < this.cardImageBase64arr.length; i++) {
            imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
        }
        this.addForm.controls['image'].setValue(imageToDB);
    };
    AddHotelComponent.prototype.ImageClick = function (image64) {
        this.func.openImageInNewWindow(image64);
    };
    AddHotelComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        if (this.cardImageBase64arr.length == 5) {
            return false;
        }
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            //const max_size = 20971520;
            var allowed_types = ['image/png', 'image/jpeg'];
            //const max_height = 15200;
            //const max_width = 25600;
            //if (fileInput.target.files[0].size > max_size) {
            //    this.imageError =
            //        'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            //    return false;
            //}
            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function (rs) {
                    //const img_height = rs.currentTarget['height'];
                    //const img_width = rs.currentTarget['width'];
                    //console.log(img_height, img_width);
                    //if (img_height > max_height && img_width > max_width) {
                    //    this.imageError =
                    //        'Maximum dimentions allowed ' +
                    //        max_height +
                    //        '*' +
                    //        max_width +
                    //        'px';
                    //    return false;
                    //} else {
                    var imgBase64Path = e.target.result;
                    _this.cardImageBase64 = imgBase64Path;
                    _this.cardImageBase64arr.push(_this.cardImageBase64);
                    _this.isImageSaved = true;
                    var imageToDB = '';
                    for (var i = 0; i < _this.cardImageBase64arr.length; i++) {
                        imageToDB = imageToDB + '^' + _this.cardImageBase64arr[i];
                    }
                    console.log(imageToDB);
                    _this.addForm.controls['image'].setValue(imageToDB);
                    //}
                };
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    };
    AddHotelComponent = __decorate([
        Component({
            selector: 'app-add-hotel',
            templateUrl: './add-hotel.component.html',
            styleUrls: ['./add-hotel.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            FuncServiceService,
            NotificationService,
            DomSanitizer,
            HotelService])
    ], AddHotelComponent);
    return AddHotelComponent;
}());
export { AddHotelComponent };
//# sourceMappingURL=add-hotel.component.js.map