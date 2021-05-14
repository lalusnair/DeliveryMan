import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
import { HotelService } from "../../../Services/hotel.service";
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';

@Component({
    selector: 'app-add-hotel',
    templateUrl: './add-hotel.component.html',
    styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private func: FuncServiceService,
        private sanitizer: DomSanitizer,
        private apiService: HotelService) { }

    addForm: FormGroup;
    cardImageBase64: string;
    cardImageBase64arr: string[] = [];
    imageError: string;
    isImageSaved: boolean;
    selectedFileBLOB
    selectedFileBLOBarr

    DaysArray: Array<any> = [{ name: 'Mon', value: 'Monday' },
    { name: 'Tue', value: 'Tuesday' },
    { name: 'Wed', value: 'Wednesday' },
    { name: 'Thu', value: 'Thursday' },
    { name: 'Fri', value: 'Friday' },
    { name: 'Sat', value: 'Saturday' },
    { name: 'Sun', value: 'Sunday' }];

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            hotel_Id: [],
            hotel_Name: ['', Validators.required],
            owner_Name: ['', Validators.required],
            owner_Address: [],
            hotel_Address: ['', Validators.required],
            contactPhone1: ['', Validators.required],
            contactPhone2: ['', Validators.required],
            contactPhone3: [],
            contactPhone4: [],
            openingTime: ['', Validators.required],
            closingTime: ['', Validators.required],
            hotelType: ['', Validators.required],
            safetyCertificateNumber: ['', Validators.required],
            lattitude: ['', Validators.required],
            longitude: ['', Validators.required],
            description: [],
            bank_Name: ['', Validators.required],
            iFSC_Code: ['', Validators.required],
            gST: ['', Validators.required],
            workingDays: ['', Validators.required],
            email: ['', Validators.required],
            landMark: [],
            website: [],
            hotelRating: [],
            isParkingAvailable: ['', Validators.required],
            isOutdoorAvailable: ['', Validators.required],
            image: [],
            checkArray: this.formBuilder.array([])
        });
    }

    onSubmit() {
        if (this.addForm.valid) {
            console.log(this.addForm.value);
            this.apiService.CreateHotel(this.addForm.value)
                .subscribe(data => {
                    this.router.navigate(['ListHotel']);
                });
        }
        else {
            alert("detailsz");
        }
    }



    onCheckboxChange(e) {
        const checkArray: FormArray = this.addForm.get('checkArray') as FormArray;

        if (e.target.checked) {
            checkArray.push(new FormControl(e.target.value));
        } else {
            let i: number = 0;
            checkArray.controls.forEach((item: FormControl) => {
                if (item.value == e.target.value) {
                    checkArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
        var value = '';
        checkArray.controls.forEach((item: FormControl) => {
            value = value + item.value + ';';
        });
        value = value.substring(0, value.lastIndexOf(';'));
        this.addForm.controls["workingDays"].setValue(value);
    }

    backToList() {
        this.router.navigate(['ListHotel']);
    }

    DeleteImage(image: string) {
        this.cardImageBase64arr.splice(this.cardImageBase64arr.indexOf(image), 1);
        var imageToDB = '';
        for (var i = 0; i < this.cardImageBase64arr.length; i++) {
            imageToDB = imageToDB + '^' + this.cardImageBase64arr[i];
        }
        this.addForm.controls['image'].setValue(imageToDB);
    }
    ImageClick(image64: string) {
        this.func.openImageInNewWindow(image64);
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



