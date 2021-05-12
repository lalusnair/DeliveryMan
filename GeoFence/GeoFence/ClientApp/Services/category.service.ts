import { Component, Inject, InjectionToken, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';
import { CategoryDetailsDTO } from 'ClientApp/app/DTOs/Category_DTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    public Http: HttpClient;
    public BaseURL: string;
    public res: string[];
    public subtitle: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, ) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }

    GetAllCategories() {
        return this.Http.get<CategoryDetailsDTO[]>(this.BaseURL + 'api/Data/GetAllCategories');
    }
    GetCategoryById(id: number) {
        let para = new HttpParams().set('id', id.toString());
        return this.Http.post<CategoryDetailsDTO>(this.BaseURL + 'api/Data/Category/id=', id);
    }

    CreateCategory(categories: CategoryDetailsDTO) {
        
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(categories.categoryName);
        return this.Http.post(this.BaseURL + 'api/Data/CreateCategory', body, { 'headers': headers });

    }

    UpdateCategory(categoryDetails: CategoryDetailsDTO) {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(categoryDetails);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateCategory/', body, { 'headers': headers });
    }


    DeleteCatgory(id: number) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteCategory/id=', id);
    }
}
