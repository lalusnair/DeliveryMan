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
var EditHotelComponent = /** @class */ (function () {
    function EditHotelComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
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
            _this.cardImageBase64arr = data.image != null ? data.image.split('^') : [];
            _this.workingDaysArr = data.workingDays != null ? data.workingDays.split(';') : [];
            var checkArray = _this.editForm.get('checkArray');
            for (var i = 0; i < _this.workingDaysArr.length; i++) {
                checkArray.push(new FormControl(_this.workingDaysArr[i]));
            }
            _this.editForm.patchValue(data);
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
    EditHotelComponent.prototype.DeleteImage = function (image) {
        this.cardImageBase64arr.splice(this.cardImageBase64arr.indexOf(image), 1);
        var imageToDB = '';
        for (var i = 0; i < this.cardImageBase64arr.length; i++) {
            imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
        }
        this.editForm.controls['image'].setValue(imageToDB);
    };
    EditHotelComponent.prototype.ImageClick = function (image64) {
        var b64toBlob = function (b64Data, contentType, sliceSize) {
            if (contentType === void 0) { contentType = ''; }
            if (sliceSize === void 0) { sliceSize = 512; }
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        var blob = b64toBlob(image64.split(',')[1], image64.split(',')[0].split(';')[0].split(':')[1]);
        var blobUrl = URL.createObjectURL(blob);
        //let url = window.URL.createObjectURL(blob);
        //window.location.href = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
        window.open(blobUrl, '_blank');
    };
    EditHotelComponent.prototype.fileChangeEvent = function (fileInput) {
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
                    _this.editForm.controls['image'].setValue(imageToDB);
                    //}
                };
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
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