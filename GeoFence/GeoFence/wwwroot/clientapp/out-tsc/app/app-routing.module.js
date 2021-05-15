var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListHotelComponent } from './hotel/list-hotel/list-hotel.component';
import { AddHotelComponent } from './hotel/add-hotel/add-hotel.component';
import { EditHotelComponent } from './hotel/edit-hotel/edit-hotel.component';
import { ViewHotelComponent } from './hotel/view-hotel/view-hotel.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ListSubcategoryComponent } from './subcategory/list-subcategory/list-subcategory.component';
import { AddSubcategoryComponent } from './subcategory/add-subcategory/add-subcategory.component';
import { ViewSubcategoryComponent } from './subcategory/view-subcategory/view-subcategory.component';
import { EditSubcategoryComponent } from './subcategory/edit-subcategory/edit-subcategory.component';
import { ListItemComponent } from './item/list-item/list-item.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ViewItemComponent } from './item/view-item/view-item.component';
var appRoutes = [
    { path: '', component: ListSubcategoryComponent },
    { path: 'ListHotel', component: ListHotelComponent },
    { path: 'ViewHotel', component: ViewHotelComponent },
    { path: 'AddHotel', component: AddHotelComponent },
    { path: 'EditHotel', component: EditHotelComponent },
    { path: 'ListCategory', component: ListCategoryComponent },
    { path: 'ViewCategory', component: ViewCategoryComponent },
    { path: 'EditCategory', component: EditCategoryComponent },
    { path: 'AddCategory', component: AddCategoryComponent },
    { path: 'ListSubCategory', component: ListSubcategoryComponent },
    { path: 'ViewSubCategory', component: ViewSubcategoryComponent },
    { path: 'EditSubCategory', component: EditSubcategoryComponent },
    { path: 'AddSubCategory', component: AddSubcategoryComponent },
    { path: 'ListItem', component: ListItemComponent },
    { path: 'ViewItem', component: ViewItemComponent },
    { path: 'EditItem', component: EditItemComponent },
    { path: 'AddItem', component: AddItemComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(appRoutes)
            ],
            exports: [
                RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map