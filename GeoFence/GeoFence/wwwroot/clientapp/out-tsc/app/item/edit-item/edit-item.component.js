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
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';
var EditItemComponent = /** @class */ (function () {
    function EditItemComponent(formBuilder, router, func, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.func = func;
        this.apiService = apiService;
        this.cardImageBase64arr = [];
    }
    EditItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.GetHotelDorpdown().subscribe(function (res) {
            _this.Hotels = res;
        });
        this.apiService.GetCategoryDorpdown().subscribe(function (res) {
            _this.Categories = res;
        });
        //this.apiService.GetSubCategoryDorpdown().subscribe(res => {
        //    this.SubCategories = res;
        //});
        var itemId = window.localStorage.getItem("editItemId");
        if (!itemId) {
            alert("Invalid action.");
            this.router.navigate(['ListItem']);
            return;
        }
        this.editForm = this.formBuilder.group({
            itemId: [],
            hotelId: [],
            image: [],
            hotel_Name: [],
            categoryName: [],
            isActive: [],
            subCategoryName: [],
            itemName: [],
            categoryId: [],
            subCategoryId: [],
            ingrediants: [],
            sellingPrice: [],
            ourPrice: [],
            preparationtime: [],
            itemAvailableTime: []
        });
        this.apiService.GetItemById(parseInt(itemId))
            .subscribe(function (data) {
            console.log(data);
            _this.cardImageBase64arr = data.image != null ? data.image.split('^') : [];
            _this.apiService.GetSubCategoryDorpdown(data.categoryId).subscribe(function (res) {
                _this.SubCategories = res;
                _this.editForm.setValue(data);
            });
        });
    };
    EditItemComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.editForm.value);
        this.apiService.UpdateItem(this.editForm.value)
            .subscribe(function (data) {
            _this.router.navigate(['ListItem']);
        });
    };
    EditItemComponent.prototype.backToList = function () {
        this.router.navigate(['ListItem']);
    };
    EditItemComponent.prototype.changeSubCategory = function (e) {
        var _this = this;
        this.apiService.GetSubCategoryDorpdown(parseInt(e.target.value)).subscribe(function (res) {
            _this.SubCategories = res;
        });
    };
    EditItemComponent.prototype.DeleteImage = function (image) {
        this.cardImageBase64arr.splice(this.cardImageBase64arr.indexOf(image), 1);
        var imageToDB = '';
        for (var i = 0; i < this.cardImageBase64arr.length; i++) {
            imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
        }
        this.editForm.controls['image'].setValue(imageToDB);
    };
    EditItemComponent.prototype.ImageClick = function (image64) {
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
    EditItemComponent.prototype.fileChangeEvent = function (fileInput) {
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
    EditItemComponent = __decorate([
        Component({
            selector: 'app-edit-item',
            templateUrl: './edit-item.component.html',
            styleUrls: ['./edit-item.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            FuncServiceService,
            ItemService])
    ], EditItemComponent);
    return EditItemComponent;
}());
export { EditItemComponent };
//# sourceMappingURL=edit-item.component.js.map