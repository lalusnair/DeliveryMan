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
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
var AddSubcategoryComponent = /** @class */ (function () {
    function AddSubcategoryComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
    }
    AddSubcategoryComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: [],
            subCategoryName: []
        });
    };
    AddSubcategoryComponent.prototype.onSubmit = function () {
        var _this = this;
        this.apiService.CreateSubCategory(this.addForm.value)
            .subscribe(function (data) {
            _this.router.navigate(['ListSubCategory']);
        });
    };
    AddSubcategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListSubCategory']);
    };
    AddSubcategoryComponent = __decorate([
        Component({
            selector: 'app-add-subcategory',
            templateUrl: './add-subcategory.component.html',
            styleUrls: ['./add-subcategory.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, SubcategoryService])
    ], AddSubcategoryComponent);
    return AddSubcategoryComponent;
}());
export { AddSubcategoryComponent };
//# sourceMappingURL=add-subcategory.component.js.map