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
            _this.editForm.setValue(data);
        });
    };
    ViewItemComponent.prototype.backToList = function () {
        this.router.navigate(['ListItem']);
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