import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from 'ClientApp/Services/item.service';
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';

@Component({
    selector: 'app-view-item',
    templateUrl: './view-item.component.html',
    styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private func: FuncServiceService,
        private apiService: ItemService) { }

    editForm: FormGroup;
    cardImageBase64arr: string[] = [];

    ngOnInit() {
        let itemId = window.localStorage.getItem("editItemId");
        if (!itemId) {
            alert("Invalid action.")
            this.router.navigate(['ListItem']);
            return;
        }
        this.editForm = this.formBuilder.group({
            itemId: [],
            hotelId: [],
            image: [],
            hotel_Name: [],
            categoryName: [],
            isActive: [],
            subCategoryName: [],
            itemName: [],
            categoryId: [],
            subCategoryId: [],
            ingrediants: [],
            sellingPrice: [],
            ourPrice: [],
            preparationtime: [],
            itemAvailableTime: []
        });

        this.apiService.GetItemById(parseInt(itemId))
            .subscribe(data => {
                this.cardImageBase64arr = data.image != null ?data.image.split('^'):[];
                this.editForm.setValue(data);
            });
    }

    backToList() {
        this.router.navigate(['ListItem']);
    }
    ImageClick(image64: string) {
        this.func.openImageInNewWindow(image64);
    }
}
