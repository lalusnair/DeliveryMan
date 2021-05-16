import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryService } from 'ClientApp/Services/category.service';
import { NotificationService } from 'ClientApp/app/services/notification.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private apiService: CategoryService) { }

    editForm: FormGroup;

    ngOnInit() {
        let categoryID = window.localStorage.getItem("editCategoryId");
        if (!categoryID) {
            this.notification.showError('Invalid Category', 'Invalid!');
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
                this.editForm.setValue(data);
            });

    }
    onSubmit() {
        console.log(this.editForm.value);
        this.apiService.UpdateCategory(this.editForm.value)
            .subscribe(data => {
                this.notification.showSuccess('Category Updated Successfully', 'Edit Category');
                this.router.navigate(['ListCategory']);
            });
    }
    backToList() {
        this.router.navigate(['ListCategory']);
    }

}
