import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ItemService } from 'ClientApp/Services/item.service';
import { HotelDropDown } from 'ClientApp/app/DTOs/Hotel_DTO';
import { CategoryDropDown } from 'ClientApp/app/DTOs/Category_DTO';
import { SubCategoryDropDown } from 'ClientApp/app/DTOs/SubCategory_DTO';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {


    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private func: FuncServiceService,
        private apiService: ItemService) { }


    addForm: FormGroup;
    cardImageBase64: string;
    cardImageBase64arr: string[] = [];
    imageError: string;
    isImageSaved: boolean;
    selectedFileBLOB
    selectedFileBLOBarr

    Hotels: HotelDropDown[];
    Categories: CategoryDropDown[];
    SubCategories: SubCategoryDropDown[];

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            itemId: [],
            hotelId: [],
            itemName: [],
            categoryId: [],
            subCategoryId: [],
            ingrediants: [],
            sellingPrice: [],
            ourPrice: [],
            preparationtime: [],
            itemAvailableTime: [],
            image: []
        });

        this.apiService.GetHotelDorpdown().subscribe(res => {
            this.Hotels = res;
        });
        this.apiService.GetCategoryDorpdown().subscribe(res => {
            this.Categories = res;
        });
    }
    onSubmit() {
        this.apiService.CreateItem(this.addForm.value)
            .subscribe(data => {
                this.router.navigate(['ListItem']);
            });
    }
    backToList() {
        this.router.navigate(['ListItem']);
    }

    DeleteImage(image: string) {
        this.cardImageBase64arr.splice(this.cardImageBase64arr.indexOf(image), 1);
        var imageToDB = '';
        for (var i = 0; i < this.cardImageBase64arr.length; i++) {
            imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
        }
        this.addForm.controls['image'].setValue(imageToDB);
    }

    changeSubCategory(e) {
        this.apiService.GetSubCategoryDorpdown(parseInt(e.target.value)).subscribe(res => {
            this.SubCategories = res;
        });
    }
    numberOnly(txt, event): boolean {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 46) {
            //Check if the text already contains the . character
            if (txt.value.indexOf('.') === -1) {
                return true;
            } else {
                return false;
            }
        } else {
            if (charCode > 31
                && (charCode < 48 || charCode > 57))
                return false;
        }
        return true;
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
    fileChangeEvent(fileInput: any) {
        if (this.cardImageBase64arr.length == 5) {
            return false;
        }
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            //const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            //const max_height = 15200;
            //const max_width = 25600;

            //if (fileInput.target.files[0].size > max_size) {
            //    this.imageError =
            //        'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            //    return false;
            //}

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    //const img_height = rs.currentTarget['height'];
                    //const img_width = rs.currentTarget['width'];
                    //console.log(img_height, img_width);

                    //if (img_height > max_height && img_width > max_width) {
                    //    this.imageError =
                    //        'Maximum dimentions allowed ' +
                    //        max_height +
                    //        '*' +
                    //        max_width +
                    //        'px';
                    //    return false;
                    //} else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.cardImageBase64arr.push(this.cardImageBase64);
                    this.isImageSaved = true;
                    var imageToDB = '';
                    for (var i = 0; i < this.cardImageBase64arr.length; i++) {
                        imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
                    }
                    console.log(imageToDB);
                    this.addForm.controls['image'].setValue(imageToDB);
                    //}
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

}
