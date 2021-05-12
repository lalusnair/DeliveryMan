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
var ViewItemComponent = /** @class */ (function () {
    function ViewItemComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
        this.cardImageBase64arr = [];
    }
    ViewItemComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            isdeleted: [],
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
            _this.cardImageBase64arr = data.image.split('^');
            _this.editForm.setValue(data);
        });
    };
    ViewItemComponent.prototype.backToList = function () {
        this.router.navigate(['ListItem']);
    };
    ViewItemComponent.prototype.ImageClick = function (image64) {
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
    ViewItemComponent = __decorate([
        Component({
            selector: 'app-view-item',
            templateUrl: './view-item.component.html',
            styleUrls: ['./view-item.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, ItemService])
    ], ViewItemComponent);
    return ViewItemComponent;
}());
export { ViewItemComponent };
//# sourceMappingURL=view-item.component.js.map