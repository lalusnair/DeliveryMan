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
var AddItemComponent = /** @class */ (function () {
    function AddItemComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
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
            itemAvailableTime: []
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