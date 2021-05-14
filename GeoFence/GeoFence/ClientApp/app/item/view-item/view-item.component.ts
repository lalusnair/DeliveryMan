import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from 'ClientApp/Services/item.service';

@Component({
    selector: 'app-view-item',
    templateUrl: './view-item.component.html',
    styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ItemService) { }

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
        const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }
        const blob = b64toBlob(image64.split(',')[1], image64.split(',')[0].split(';')[0].split(':')[1]);
        const blobUrl = URL.createObjectURL(blob);

        //let url = window.URL.createObjectURL(blob);

        //window.location.href = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
        window.open(blobUrl, '_blank');

    }
}
