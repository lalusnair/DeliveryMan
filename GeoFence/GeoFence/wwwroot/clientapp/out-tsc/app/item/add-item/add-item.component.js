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
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from 'ClientApp/Services/item.service';
import * as _ from 'lodash';
var AddItemComponent = /** @class */ (function () {
    function AddItemComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
        this.cardImageBase64arr = [];
    }
    AddItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addForm = this.formBuilder.group({
            itemId: [],
            hotelId: [],
            itemName: [],
            categoryId: [],
            subCategoryId: [],
            ingrediants: [],
            sellingPrice: [],
            ourPrice: [],
            preparationtime: [],
            itemAvailableTime: [],
            image: []
        });
        this.apiService.GetHotelDorpdown().subscribe(function (res) {
            _this.Hotels = res;
        });
        this.apiService.GetCategoryDorpdown().subscribe(function (res) {
            _this.Categories = res;
        });
    };
    AddItemComponent.prototype.onSubmit = function () {
        var _this = this;
        this.apiService.CreateItem(this.addForm.value)
            .subscribe(function (data) {
            _this.router.navigate(['ListItem']);
        });
    };
    AddItemComponent.prototype.backToList = function () {
        this.router.navigate(['ListItem']);
    };
    AddItemComponent.prototype.changeSubCategory = function (e) {
        var _this = this;
        this.apiService.GetSubCategoryDorpdown(parseInt(e.target.value)).subscribe(function (res) {
            _this.SubCategories = res;
        });
    };
    AddItemComponent.prototype.numberOnly = function (txt, event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 46) {
            //Check if the text already contains the . character
            if (txt.value.indexOf('.') === -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (charCode > 31
                && (charCode < 48 || charCode > 57))
                return false;
        }
        return true;
    };
    AddItemComponent.prototype.ImageClick = function (image64) {
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
    AddItemComponent.prototype.fileChangeEvent = function (fileInput) {
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
    AddItemComponent = __decorate([
        Component({
            selector: 'app-add-item',
            templateUrl: './add-item.component.html',
            styleUrls: ['./add-item.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            ItemService])
    ], AddItemComponent);
    return AddItemComponent;
}());
export { AddItemComponent };
//# sourceMappingURL=add-item.component.js.map