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
import { CategoryService } from 'ClientApp/Services/category.service';
import { Router } from '@angular/router';
var ListCategoryComponent = /** @class */ (function () {
    function ListCategoryComponent(router, categoryServ) {
        this.router = router;
        this._categoryService = categoryServ;
    }
    ListCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._categoryService.GetAllCategories().subscribe(function (res) {
            _this.categoryData = res;
        });
    };
    ListCategoryComponent.prototype.addCategory = function () {
        this.router.navigate(['AddCategory']);
    };
    ;
    ListCategoryComponent.prototype.deleteCategory = function (category) {
        var _this = this;
        this._categoryService.DeleteCatgory(category.categoryId).subscribe(function (res) {
            var idx = _this.categoryData.indexOf(category);
            category.isDeleted = category.isDeleted == 1 ? 0 : 1;
            _this.categoryData[idx] = category;
        });
    };
    ;
    ListCategoryComponent.prototype.editCategory = function (category) {
        window.localStorage.removeItem("editCategoryId");
        window.localStorage.setItem("editCategoryId", category.categoryId.toString());
        this.router.navigate(['EditCategory']);
    };
    ;
    ListCategoryComponent.prototype.viewCategory = function (category) {
        window.localStorage.removeItem("editCategoryId");
        window.localStorage.setItem("editCategoryId", category.categoryId.toString());
        this.router.navigate(['ViewCategory']);
    };
    ;
    ListCategoryComponent = __decorate([
        Component({
            selector: 'app-list-category',
            templateUrl: './list-category.component.html',
            styleUrls: ['./list-category.component.css']
        }),
        __metadata("design:paramtypes", [Router, CategoryService])
    ], ListCategoryComponent);
    return ListCategoryComponent;
}());
export { ListCategoryComponent };
//# sourceMappingURL=list-category.component.js.map