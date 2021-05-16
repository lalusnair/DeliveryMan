import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryService } from 'ClientApp/Services/category.service';
import { NotificationService } from 'ClientApp/app/services/notification.service';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private apiService: CategoryService) { }

    addForm: FormGroup;

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            categoryId: [],
            categoryName: []
        });

    }
    onSubmit() {
        this.apiService.CreateCategory(this.addForm.value)
            .subscribe(data => {
                this.notification.showSuccess('Category Added Successfully', 'Add Category');
                this.router.navigate(['ListCategory']);
            });
    }
    backToList() {
        this.router.navigate(['ListCategory']);
    }
}
