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
import { CategoryService } from 'ClientApp/Services/category.service';
var ViewCategoryComponent = /** @class */ (function () {
    function ViewCategoryComponent(formBuilder, router, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.apiService = apiService;
    }
    ViewCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var categoryID = window.localStorage.getItem("editCategoryId");
        if (!categoryID) {
            alert("Invalid action.");
            this.router.navigate(['ListCategory']);
            return;
        }
        this.editForm = this.formBuilder.group({
            categoryId: [],
            categoryName: ['', Validators.required],
        });
        this.apiService.GetCategoryById(parseInt(categoryID))
            .subscribe(function (data) {
            console.log(data);
            _this.editForm.setValue(data);
        });
    };
    ViewCategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListCategory']);
    };
    ViewCategoryComponent = __decorate([
        Component({
            selector: 'app-view-category',
            templateUrl: './view-category.component.html',
            styleUrls: ['./view-category.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, CategoryService])
    ], ViewCategoryComponent);
    return ViewCategoryComponent;
}());
export { ViewCategoryComponent };
//# sourceMappingURL=view-category.component.js.map