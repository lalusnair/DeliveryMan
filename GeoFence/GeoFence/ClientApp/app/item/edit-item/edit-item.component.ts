import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from 'ClientApp/Services/item.service';
import { HotelDropDown } from 'ClientApp/app/DTOs/Hotel_DTO';
import { CategoryDropDown } from 'ClientApp/app/DTOs/Category_DTO';
import { SubCategoryDropDown } from 'ClientApp/app/DTOs/SubCategory_DTO';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

    Hotels: HotelDropDown[];
    Categories: CategoryDropDown[];
    SubCategories: SubCategoryDropDown[];

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ItemService) { }

    editForm: FormGroup;

    ngOnInit() {
        this.apiService.GetHotelDorpdown().subscribe(res => {
            this.Hotels = res;
        });
        this.apiService.GetCategoryDorpdown().subscribe(res => {
            this.Categories = res;
        });
        //this.apiService.GetSubCategoryDorpdown().subscribe(res => {
        //    this.SubCategories = res;
        //});

        let itemId = window.localStorage.getItem("editItemId");
        if (!itemId) {
            alert("Invalid action.")
            this.router.navigate(['ListItem']);
            return;
        }
        this.editForm = this.formBuilder.group({
            itemId: [],
            hotelId: [],
            image: [],
            hotel_Name: [],
            categoryName: [],
            isActive: [],
            subCategoryName: [],
            itemName: [],
            categoryId: [],
            subCategoryId: [],
            ingrediants: [],
            sellingPrice: [],
            ourPrice: [],
            preparationtime: [],
            itemAvailableTime: []
        });

        this.apiService.GetItemById(parseInt(itemId))
            .subscribe(data => {
                console.log(data);
                this.apiService.GetSubCategoryDorpdown(data.categoryId).subscribe(res => {
                    this.SubCategories = res;
                    this.editForm.setValue(data);
                });                
            });
    }

    onSubmit() {
        console.log(this.editForm.value);
        this.apiService.UpdateItem(this.editForm.value)
            .subscribe(data => {
                this.router.navigate(['ListItem']);
            });
    }
    backToList() {
        this.router.navigate(['ListItem']);
    }

    changeSubCategory(e) {
        this.apiService.GetSubCategoryDorpdown(parseInt(e.target.value)).subscribe(res => {
            this.SubCategories = res;
        });   
    }

}
