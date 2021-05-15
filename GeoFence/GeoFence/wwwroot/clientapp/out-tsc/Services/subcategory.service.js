var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
var SubcategoryService = /** @class */ (function () {
    function SubcategoryService(http, baseUrl) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }
    SubcategoryService.prototype.GetCategoryDorpdown = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetCategoriesForDropDown');
    };
    SubcategoryService.prototype.GetAllSubCategories = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetAllSubCategories');
    };
    SubcategoryService.prototype.GetSubCategoryById = function (id) {
        var para = new HttpParams().set('id', id.toString());
        return this.Http.post(this.BaseURL + 'api/Data/SubCategory/id=', id);
    };
    SubcategoryService.prototype.CreateSubCategory = function (subCategories) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(subCategories);
        return this.Http.post(this.BaseURL + 'api/Data/CreateSubCategory', body, { 'headers': headers });
    };
    SubcategoryService.prototype.UpdateSubCategory = function (subCategory) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(subCategory);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateSubCategory/', body, { 'headers': headers });
    };
    SubcategoryService.prototype.DeleteSubCatgory = function (id) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteSubCategory/id=', id);
    };
    SubcategoryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], SubcategoryService);
    return SubcategoryService;
}());
export { SubcategoryService };
//# sourceMappingURL=subcategory.service.js.map