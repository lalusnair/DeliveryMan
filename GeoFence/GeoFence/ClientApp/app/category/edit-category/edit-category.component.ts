import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { debug } from 'util';
import { CategoryService } from 'ClientApp/Services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: CategoryService) { }

    editForm: FormGroup;

    ngOnInit() {
        let categoryID = window.localStorage.getItem("editCategoryId");
        if (!categoryID) {
            alert("Invalid action.")
            this.router.navigate(['ListCategory']);
            return;
        }
        this.editForm = this.formBuilder.group({
            categoryId: [],
            categoryName: ['', Validators.required],
            isActive: []
        });

        this.apiService.GetCategoryById(parseInt(categoryID))
            .subscribe(data => {
                console.log(data);
                this.editForm.setValue(data);
            });

    }
    onSubmit() {
        console.log(this.editForm.value);
        this.apiService.UpdateCategory(this.editForm.value)
            .subscribe(data => {
                this.router.navigate(['ListCategory']);
            });
    }
    backToList() {
        this.router.navigate(['ListCategory']);
    }

}
