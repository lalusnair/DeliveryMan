import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { debug } from 'util';
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';

@Component({
    selector: 'app-view-subcategory',
    templateUrl: './view-subcategory.component.html',
    styleUrls: ['./view-subcategory.component.css']
})
export class ViewSubcategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: SubcategoryService) { }
    editForm: FormGroup;

    ngOnInit() {
        let categoryID = window.localStorage.getItem("editSubCategoryId");
        if (!categoryID) {
            alert("Invalid action.")
            this.router.navigate(['ListSubCategory']);
            return;
        }

        this.editForm = this.formBuilder.group({
            subCategoryId: [],
            categoryId: ['', Validators.required],
            subCategoryName: ['', Validators.required]
        });

        this.apiService.GetSubCategoryById(parseInt(categoryID))
            .subscribe(data => {
                console.log(data);
                this.editForm.setValue(data);
            });
    }

    backToList() {
        this.router.navigate(['ListSubCategory']);
    }
}
