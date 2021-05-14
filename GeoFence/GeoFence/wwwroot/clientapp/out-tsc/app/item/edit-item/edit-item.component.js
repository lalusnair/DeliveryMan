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
var EditItemComponent = /** @class */ (function () {
    function EditItemComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
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
    EditItemComponent = __decorate([
        Component({
            selector: 'app-edit-item',
            templateUrl: './edit-item.component.html',
            styleUrls: ['./edit-item.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, ItemService])
    ], EditItemComponent);
    return EditItemComponent;
}());
export { EditItemComponent };
//# sourceMappingURL=edit-item.component.js.map