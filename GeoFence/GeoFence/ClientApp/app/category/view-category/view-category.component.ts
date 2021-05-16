import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryService } from 'ClientApp/Services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

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
       
        });

        this.apiService.GetCategoryById(parseInt(categoryID))
            .subscribe(data => {
                console.log(data);
                this.editForm.setValue(data);
            });
    }

    backToList() {
        this.router.navigate(['ListCategory']);
    }

}
