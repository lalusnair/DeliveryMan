import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
import { CategoryDropDown } from 'ClientApp/app/DTOs/Category_DTO';

@Component({
    selector: 'app-add-subcategory',
    templateUrl: './add-subcategory.component.html',
    styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: SubcategoryService) { }

    addForm: FormGroup;
    Categories: CategoryDropDown[];

    ngOnInit() {

        this.apiService.GetCategoryDorpdown().subscribe(res => {
            this.Categories = res;
        });

        this.addForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: [],
            categoryName: [],
            subCategoryName: []
        });
    }
    onSubmit() {
        this.apiService.CreateSubCategory(this.addForm.value)
            .subscribe(data => {
                this.router.navigate(['ListSubCategory']);
            });
    }
    backToList() {
        this.router.navigate(['ListSubCategory']);
    }
}
