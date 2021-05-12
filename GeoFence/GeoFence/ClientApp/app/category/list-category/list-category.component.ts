import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'ClientApp/Services/category.service';
import { CategoryDetailsDTO } from 'ClientApp/app/DTOs/Category_DTO';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-category',
    templateUrl: './list-category.component.html',
    styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {


    private _categoryService: CategoryService;
    public categoryData: CategoryDetailsDTO[];

    constructor(private router: Router, categoryServ: CategoryService) {
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
            this.categoryData = this.categoryData.filter(u => u !== category);
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
