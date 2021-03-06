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
import { CategoryService } from 'ClientApp/Services/category.service';
import { NotificationService } from 'ClientApp/app/services/notification.service';
var AddCategoryComponent = /** @class */ (function () {
    function AddCategoryComponent(formBuilder, router, notification, apiService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.apiService = apiService;
    }
    AddCategoryComponent.prototype.ngOnInit = function () {
        this.addForm = this.formBuilder.group({
            categoryId: [],
            categoryName: []
        });
    };
    AddCategoryComponent.prototype.onSubmit = function () {
        var _this = this;
        this.apiService.CreateCategory(this.addForm.value)
            .subscribe(function (data) {
            _this.notification.showSuccess('Category Added Successfully', 'Add Category');
            _this.router.navigate(['ListCategory']);
        });
    };
    AddCategoryComponent.prototype.backToList = function () {
        this.router.navigate(['ListCategory']);
    };
    AddCategoryComponent = __decorate([
        Component({
            selector: 'app-add-category',
            templateUrl: './add-category.component.html',
            styleUrls: ['./add-category.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            NotificationService,
            CategoryService])
    ], AddCategoryComponent);
    return AddCategoryComponent;
}());
export { AddCategoryComponent };
//# sourceMappingURL=add-category.component.js.map