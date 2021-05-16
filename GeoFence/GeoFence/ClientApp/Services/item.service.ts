import { Component, Inject, InjectionToken, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ItemDetailsDTO } from 'ClientApp/app/DTOs/Item_DTO';
import { HotelDropDown } from 'ClientApp/app/DTOs/Hotel_DTO';
import { CategoryDropDown } from 'ClientApp/app/DTOs/Category_DTO';
import { SubCategoryDropDown } from 'ClientApp/app/DTOs/SubCategory_DTO';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    public Http: HttpClient;
    public BaseURL: string;
    public res: string[];
    public subtitle: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, ) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }

    GetAllItems() {
        return this.Http.get<ItemDetailsDTO[]>(this.BaseURL + 'api/Data/GetAllItems');
    }
    GetHotelDorpdown() {
        return this.Http.get<HotelDropDown[]>(this.BaseURL + 'api/Data/GetHotelsForDropDown');
    }
    GetCategoryDorpdown() {
        return this.Http.get<CategoryDropDown[]>(this.BaseURL + 'api/Data/GetCategoriesForDropDown');
    }
    GetSubCategoryDorpdown(id:number) {
        return this.Http.post<SubCategoryDropDown[]>(this.BaseURL + 'api/Data/GetSubCategoriesForDropDown/id=', id);
    }
    GetItemById(id: number) {
        let para = new HttpParams().set('id', id.toString());
        return this.Http.post<ItemDetailsDTO>(this.BaseURL + 'api/Data/Item/id=', id);
    }

    CreateItem(item: ItemDetailsDTO) {

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(item);
        return this.Http.post(this.BaseURL + 'api/Data/CreateItem', body, { 'headers': headers });

    }

    UpdateItem(item: ItemDetailsDTO) {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(item);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateItem/', body, { 'headers': headers });

    }


    DeleteItem(id: number) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteItem/id=', id);
    }
}
