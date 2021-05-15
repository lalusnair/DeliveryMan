import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategoryDetailsDTO } from 'ClientApp/app/DTOs/SubCategory_DTO';
import { SubcategoryService } from 'ClientApp/Services/subcategory.service';
@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.css']
})
export class ListSubcategoryComponent implements OnInit {

    private _subCategoryService: SubcategoryService;
    public subCategoryData: SubCategoryDetailsDTO[];

    constructor(private router: Router, subCategoryServ: SubcategoryService) {
        this._subCategoryService = subCategoryServ;
    }
    ngOnInit() {
        this._subCategoryService.GetAllSubCategories().subscribe(res => {
            this.subCategoryData = res;
        });
    }

    addSubCategory(): void {
        this.router.navigate(['AddSubCategory']);
    };

    deleteSubCategory(subCategory: SubCategoryDetailsDTO): void {
        this._subCategoryService.DeleteSubCatgory(subCategory.subCategoryId).subscribe(res => {
            var idx = this.subCategoryData.indexOf(subCategory);
            subCategory.isActive = subCategory.isActive == 1 ? 0 : 1;
            this.subCategoryData[idx] = subCategory;
        });
    };

    editSubCategory(subCategory: SubCategoryDetailsDTO): void {
        window.localStorage.removeItem("editSubCategoryId");
        window.localStorage.setItem("editSubCategoryId", subCategory.subCategoryId.toString());
        this.router.navigate(['EditSubCategory']);
    };

    viewSubCategory(subCategory: SubCategoryDetailsDTO): void {
        window.localStorage.removeItem("editSubCategoryId");
        window.localStorage.setItem("editSubCategoryId", subCategory.subCategoryId.toString());
        this.router.navigate(['ViewSubCategory']);
    };
}
