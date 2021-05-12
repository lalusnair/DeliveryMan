import { Component, Inject, InjectionToken, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';
import { SubCategoryDetailsDTO } from 'ClientApp/app/DTOs/SubCategory_DTO';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
    public Http: HttpClient;
    public BaseURL: string;
    public res: string[];
    public subtitle: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, ) {
        this.Http = http;
        this.BaseURL = baseUrl;
    }

    GetAllSubCategories() {
        return this.Http.get<SubCategoryDetailsDTO[]>(this.BaseURL + 'api/Data/GetAllSubCategories');
    }
    GetSubCategoryById(id: number) {
        let para = new HttpParams().set('id', id.toString());
        return this.Http.post<SubCategoryDetailsDTO>(this.BaseURL + 'api/Data/SubCategory/id=', id);
    }

    CreateSubCategory(subCategories: SubCategoryDetailsDTO) {

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(subCategories);
        return this.Http.post(this.BaseURL + 'api/Data/CreateSubCategory', body, { 'headers': headers });

    }

    UpdateSubCategory(subCategory: SubCategoryDetailsDTO) {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(subCategory);
        return this.Http.post(this.BaseURL + 'api/Data/UpdateSubCategory/', body, { 'headers': headers });

    }


    DeleteSubCatgory(id: number) {
        return this.Http.post(this.BaseURL + 'api/Data/DeleteSubCategory/id=', id);
    }

}
