import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { debug } from 'util';
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
import { CategoryDropDown } from 'ClientApp/app/DTOs/Category_DTO';

@Component({
    selector: 'app-edit-subcategory',
    templateUrl: './edit-subcategory.component.html',
    styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: SubcategoryService) { }

    editForm: FormGroup;
    Categories: CategoryDropDown[];
    ngOnInit() {
        let subCategoryID = window.localStorage.getItem("editSubCategoryId");
        if (!subCategoryID) {
            alert("Invalid action.")
            this.router.navigate(['ListSubCategory']);
            return;
        }

        this.apiService.GetCategoryDorpdown().subscribe(res => {
            this.Categories = res;
        });

        this.editForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: ['', Validators.required],
            categoryName: [],
            subCategoryName: ['', Validators.required],
            isDeleted: []
        });

        this.apiService.GetSubCategoryById(parseInt(subCategoryID))
            .subscribe(data => {
                console.log(data);
                this.editForm.setValue(data);
            });

    }
    onSubmit() {
        console.log(this.editForm.value);
        this.apiService.UpdateSubCategory(this.editForm.value)
            .subscribe(data => {
                this.router.navigate(['ListSubCategory']);
            });
    }
    backToList() {
        this.router.navigate(['ListSubCategory']);
    }

}
