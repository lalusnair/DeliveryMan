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
import { Router } from '@angular/router';
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
var ListSubcategoryComponent = /** @class */ (function () {
    function ListSubcategoryComponent(router, subCategoryServ) {
        this.router = router;
        this._subCategoryService = subCategoryServ;
    }
    ListSubcategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subCategoryService.GetAllSubCategories().subscribe(function (res) {
            _this.subCategoryData = res;
        });
    };
    ListSubcategoryComponent.prototype.addSubCategory = function () {
        this.router.navigate(['AddSubCategory']);
    };
    ;
    ListSubcategoryComponent.prototype.deleteSubCategory = function (subCategory) {
        var _this = this;
        this._subCategoryService.DeleteSubCatgory(subCategory.subCategoryId).subscribe(function (res) {
            var idx = _this.subCategoryData.indexOf(subCategory);
            subCategory.isActive = subCategory.isActive == 1 ? 0 : 1;
            _this.subCategoryData[idx] = subCategory;
        });
    };
    ;
    ListSubcategoryComponent.prototype.editSubCategory = function (subCategory) {
        window.localStorage.removeItem("editSubCategoryId");
        window.localStorage.setItem("editSubCategoryId", subCategory.subCategoryId.toString());
        this.router.navigate(['EditSubCategory']);
    };
    ;
    ListSubcategoryComponent.prototype.viewSubCategory = function (subCategory) {
        window.localStorage.removeItem("editSubCategoryId");
        window.localStorage.setItem("editSubCategoryId", subCategory.subCategoryId.toString());
        this.router.navigate(['ViewSubCategory']);
    };
    ;
    ListSubcategoryComponent = __decorate([
        Component({
            selector: 'app-list-subcategory',
            templateUrl: './list-subcategory.component.html',
            styleUrls: ['./list-subcategory.component.css']
        }),
        __metadata("design:paramtypes", [Router, SubcategoryService])
    ], ListSubcategoryComponent);
    return ListSubcategoryComponent;
}());
export { ListSubcategoryComponent };
//# sourceMappingURL=list-subcategory.component.js.map