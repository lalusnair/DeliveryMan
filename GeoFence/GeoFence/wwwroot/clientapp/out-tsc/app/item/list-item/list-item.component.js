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
import { ItemService } from 'ClientApp/Services/item.service';
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, itemService) {
        this.router = router;
        this._itemService = itemService;
    }
    ListItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._itemService.GetAllItems().subscribe(function (res) {
            _this.itemData = res;
        });
    };
    ListItemComponent.prototype.addItem = function () {
        this.router.navigate(['AddItem']);
    };
    ;
    ListItemComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this._itemService.DeleteItem(item.itemId).subscribe(function (res) {
            var idx = _this.itemData.indexOf(item);
            item.isActive = item.isActive == 1 ? 0 : 1;
            _this.itemData[idx] = item;
        });
    };
    ;
    ListItemComponent.prototype.editItem = function (item) {
        window.localStorage.removeItem("editItemId");
        window.localStorage.setItem("editItemId", item.itemId.toString());
        this.router.navigate(['EditItem']);
    };
    ;
    ListItemComponent.prototype.viewItem = function (item) {
        window.localStorage.removeItem("editItemId");
        window.localStorage.setItem("editItemId", item.itemId.toString());
        this.router.navigate(['ViewItem']);
    };
    ;
    ListItemComponent = __decorate([
        Component({
            selector: 'app-list-item',
            templateUrl: './list-item.component.html',
            styleUrls: ['./list-item.component.css']
        }),
        __metadata("design:paramtypes", [Router, ItemService])
    ], ListItemComponent);
    return ListItemComponent;
}());
export { ListItemComponent };
//# sourceMappingURL=list-item.component.js.map