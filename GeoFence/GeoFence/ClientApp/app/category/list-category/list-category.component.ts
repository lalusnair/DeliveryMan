import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'ClientApp/Services/category.service';
import { CategoryDetailsDTO } from 'ClientApp/app/DTOs/Category_DTO';
import { Router } from '@angular/router';
import { NotificationService } from 'ClientApp/app/services/notification.service';

@Component({
    selector: 'app-list-category',
    templateUrl: './list-category.component.html',
    styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {


    private _categoryService: CategoryService;
    public categoryData: CategoryDetailsDTO[];

    constructor(private router: Router,
        private notification: NotificationService,
        categoryServ: CategoryService) {
        this._categoryService = categoryServ;
    }

    ngOnInit() {
        this._categoryService.GetAllCategories().subscribe(res => {
            this.categoryData = res;
        });
    }

    addCategory(): void {
        this.router.navigate(['AddCategory']);
    };

    deleteCategory(category: CategoryDetailsDTO): void {
        this._categoryService.DeleteCatgory(category.categoryId).subscribe(res => {
            var idx = this.categoryData.indexOf(category);
            category.isActive = category.isActive == 1 ? 0 : 1;
            var activationStatus = category.isActive == 1 ? 'Activated' : 'Inactivated';
            this.categoryData[idx] = category;
            this.notification.showSuccess('Category '+activationStatus+' Successfully', 'Category');
        });
    };
    editCategory(category: CategoryDetailsDTO): void {
        window.localStorage.removeItem("editCategoryId");
        window.localStorage.setItem("editCategoryId", category.categoryId.toString());
        this.router.navigate(['EditCategory']);
    };

    viewCategory(category: CategoryDetailsDTO): void {
        window.localStorage.removeItem("editCategoryId");
        window.localStorage.setItem("editCategoryId", category.categoryId.toString());
        this.router.navigate(['ViewCategory']);
    };
}
