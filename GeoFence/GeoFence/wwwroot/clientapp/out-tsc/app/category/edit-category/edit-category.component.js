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
import { NotificationService } from 'ClientApp/app/services/notification.service';
var EditCategoryComponent = /** @class */ (function () {
    function EditCategoryComponent(formBuilder, router, notification, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.apiService = apiService;
    }
    EditCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var categoryID = window.localStorage.getItem("editCategoryId");
        if (!categoryID) {
            this.notification.showError('Invalid Category', 'Invalid!');
            this.router.navigate(['ListCategory']);
            return;
        }
        this.editForm = this.formBuilder.group({
            categoryId: [],
            categoryName: ['', Validators.required],
            isActive: []
        });
        this.apiService.GetCategoryById(parseInt(categoryID))
            .subscribe(function (data) {
            _this.editForm.setValue(data);
        });
    };
    EditCategoryComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.editForm.value);
        this.apiService.UpdateCategory(this.editForm.value)
            .subscribe(function (data) {
            _this.notification.showSuccess('Category Updated Successfully', 'Edit Category');
            _this.router.navigate(['ListCategory']);
        });
    };
    EditCategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListCategory']);
    };
    EditCategoryComponent = __decorate([
        Component({
            selector: 'app-edit-category',
            templateUrl: './edit-category.component.html',
            styleUrls: ['./edit-category.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            NotificationService,
            CategoryService])
    ], EditCategoryComponent);
    return EditCategoryComponent;
}());
export { EditCategoryComponent };
//# sourceMappingURL=edit-category.component.js.map