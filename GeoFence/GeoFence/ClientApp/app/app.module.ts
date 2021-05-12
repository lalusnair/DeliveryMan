import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { getBaseUrl } from 'ClientApp/main';
import { HotelService } from '../Services/hotel.service';
import { ListHotelComponent } from './hotel/list-hotel/list-hotel.component';
import { AddHotelComponent } from './hotel/add-hotel/add-hotel.component';
import { EditHotelComponent } from './hotel/edit-hotel/edit-hotel.component';
import { AppRoutingModule } from './/app-routing.module';
import { ViewHotelComponent } from './hotel/view-hotel/view-hotel.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { EditSubcategoryComponent } from './subcategory/edit-subcategory/edit-subcategory.component';
import { ListSubcategoryComponent } from './subcategory/list-subcategory/list-subcategory.component';
import { ViewSubcategoryComponent } from './subcategory/view-subcategory/view-subcategory.component';
import { AddSubcategoryComponent } from './subcategory/add-subcategory/add-subcategory.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ViewItemComponent } from './item/view-item/view-item.component';
import { ListItemComponent } from './item/list-item/list-item.component';

@NgModule({
    declarations: [
        AppComponent,
        ListHotelComponent,
        AddHotelComponent,
        EditHotelComponent,
        ViewHotelComponent,
        AddCategoryComponent,
        ListCategoryComponent,
        ViewCategoryComponent,
        EditCategoryComponent,
        EditSubcategoryComponent,
        ListSubcategoryComponent,
        ViewSubcategoryComponent,
        AddSubcategoryComponent,
        AddItemComponent,
        EditItemComponent,
        ViewItemComponent,
        ListItemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }, HotelService],
    bootstrap: [AppComponent]
})
export class AppModule { }
