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
import { NotificationService } from 'ClientApp/app/services/notification.service';
var EditSubcategoryComponent = /** @class */ (function () {
    function EditSubcategoryComponent(formBuilder, router, notification, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.apiService = apiService;
    }
    EditSubcategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var subCategoryID = window.localStorage.getItem("editSubCategoryId");
        if (!subCategoryID) {
            alert("Invalid action.");
            this.router.navigate(['ListSubCategory']);
            return;
        }
        this.apiService.GetCategoryDorpdown().subscribe(function (res) {
            _this.Categories = res;
        });
        this.editForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: ['', Validators.required],
            categoryName: [],
            subCategoryName: ['', Validators.required],
            isActive: []
        });
        this.apiService.GetSubCategoryById(parseInt(subCategoryID))
            .subscribe(function (data) {
            console.log(data);
            _this.editForm.setValue(data);
        });
    };
    EditSubcategoryComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.editForm.value);
        this.apiService.UpdateSubCategory(this.editForm.value)
            .subscribe(function (data) {
            _this.router.navigate(['ListSubCategory']);
        });
    };
    EditSubcategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListSubCategory']);
    };
    EditSubcategoryComponent = __decorate([
        Component({
            selector: 'app-edit-subcategory',
            templateUrl: './edit-subcategory.component.html',
            styleUrls: ['./edit-subcategory.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            NotificationService,
            SubcategoryService])
    ], EditSubcategoryComponent);
    return EditSubcategoryComponent;
}());
export { EditSubcategoryComponent };
//# sourceMappingURL=edit-subcategory.component.js.map