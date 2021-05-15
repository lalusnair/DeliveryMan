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
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
var ViewSubcategoryComponent = /** @class */ (function () {
    function ViewSubcategoryComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
    }
    ViewSubcategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var categoryID = window.localStorage.getItem("editSubCategoryId");
        if (!categoryID) {
            alert("Invalid action.");
            this.router.navigate(['ListSubCategory']);
            return;
        }
        this.editForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: ['', Validators.required],
            categoryName: ['', Validators.required],
            subCategoryName: ['', Validators.required],
            isActive: ['', Validators.required],
        });
        this.apiService.GetSubCategoryById(parseInt(categoryID))
            .subscribe(function (data) {
            console.log(data);
            _this.editForm.setValue(data);
        });
    };
    ViewSubcategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListSubCategory']);
    };
    ViewSubcategoryComponent = __decorate([
        Component({
            selector: 'app-view-subcategory',
            templateUrl: './view-subcategory.component.html',
            styleUrls: ['./view-subcategory.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, SubcategoryService])
    ], ViewSubcategoryComponent);
    return ViewSubcategoryComponent;
}());
export { ViewSubcategoryComponent };
//# sourceMappingURL=view-subcategory.component.js.map