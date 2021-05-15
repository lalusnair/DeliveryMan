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
var CategoryService = /** @class */ (function () {
    function CategoryService(http, baseUrl) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }
    CategoryService.prototype.GetAllCategories = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetAllCategories');
    };
    CategoryService.prototype.GetCategoryById = function (id) {
        var para = new HttpParams().set('id', id.toString());
        return this.Http.post(this.BaseURL + 'api/Data/Category/id=', id);
    };
    CategoryService.prototype.CreateCategory = function (categories) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(categories.categoryName);
        return this.Http.post(this.BaseURL + 'api/Data/CreateCategory', body, { 'headers': headers });
    };
    CategoryService.prototype.UpdateCategory = function (categoryDetails) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(categoryDetails);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateCategory/', body, { 'headers': headers });
    };
    CategoryService.prototype.DeleteCatgory = function (id) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteCategory/id=', id);
    };
    CategoryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], CategoryService);
    return CategoryService;
}());
export { CategoryService };
//# sourceMappingURL=category.service.js.map