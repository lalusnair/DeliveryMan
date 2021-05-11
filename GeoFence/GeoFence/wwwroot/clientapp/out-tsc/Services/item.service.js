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
var ItemService = /** @class */ (function () {
    function ItemService(http, baseUrl) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }
    ItemService.prototype.GetAllItems = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetAllItems');
    };
    ItemService.prototype.GetHotelDorpdown = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetHotelsForDropDown');
    };
    ItemService.prototype.GetCategoryDorpdown = function () {
        return this.Http.get(this.BaseURL + 'api/Data/GetCategoriesForDropDown');
    };
    ItemService.prototype.GetSubCategoryDorpdown = function (id) {
        return this.Http.post(this.BaseURL + 'api/Data/GetSubCategoriesForDropDown/id=', id);
    };
    ItemService.prototype.GetItemById = function (id) {
        var para = new HttpParams().set('id', id.toString());
        return this.Http.post(this.BaseURL + 'api/Data/Item/id=', id);
    };
    ItemService.prototype.CreateItem = function (item) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(item);
        return this.Http.post(this.BaseURL + 'api/Data/CreateItem', body, { 'headers': headers });
    };
    ItemService.prototype.UpdateItem = function (item) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(item);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateItem/', body, { 'headers': headers });
    };
    ItemService.prototype.DeleteItem = function (id) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteItem/id=', id);
    };
    ItemService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], ItemService);
    return ItemService;
}());
export { ItemService };
//# sourceMappingURL=item.service.js.map