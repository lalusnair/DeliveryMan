import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HotelService } from "../../../Services/hotel.service";
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncServiceService } from 'ClientApp/app/services/func-service.service';
import { NotificationService } from 'ClientApp/app/services/notification.service';

@Component({
    selector: 'app-edit-hotel',
    templateUrl: './edit-hotel.component.html',
    styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private notification: NotificationService,
        private func: FuncServiceService,
        private apiService: HotelService) { }

    editForm: FormGroup;

    cardImageBase64: string;
    cardImageBase64arr: string[] = [];
    imageError: string;
    isImageSaved: boolean;
    selectedFileBLOB
    selectedFileBLOBarr

    workingDaysArr: Array<string> = [];
    DaysArray: Array<any> = [{ name: 'Mon', value: 'Monday' },
    { name: 'Tue', value: 'Tuesday' },
    { name: 'Wed', value: 'Wednesday' },
    { name: 'Thu', value: 'Thursday' },
    { name: 'Fri', value: 'Friday' },
    { name: 'Sat', value: 'Saturday' },
    { name: 'Sun', value: 'Sunday' }];

    ngOnInit() {
        let hotelID = window.localStorage.getItem("editUserId");
        if (!hotelID) {
            alert("Invalid action.")
            this.router.navigate(['ListHotel']);
            return;
        }

        this.editForm = this.formBuilder.group({
            hotel_Id: [],
            hotelName: ['', Validators.required],
            ownerName: ['', Validators.required],
            ownerAddress: [],
            hotelAddress: ['', Validators.required],
            contactPhone1: ['', Validators.required],
            contactPhone2: ['', Validators.required],
            contactPhone3: [],
            contactPhone4: [],
            openingTime: ['', Validators.required],
            closingTime: ['', Validators.required],
            hotelType: ['', Validators.required],
            safetyCertNo: ['', Validators.required],
            lattitude: ['', Validators.required],
            longitude: ['', Validators.required],
            description: [],
            bankName: ['', Validators.required],
            ifscCode: ['', Validators.required],
            gst: ['', Validators.required],
            workingDays: ['', Validators.required],
            email: ['', Validators.required],
            landMark: [],
            website: [],
            hotelRating: [],
            isParkingAvailable: ['', Validators.required],
            isOutdoorAvailable: ['', Validators.required],
            isActive: [],
            creationDate: [],
            modifiedDate: [],
            image: [],
            checkArray: this.formBuilder.array([])
        });

        this.apiService.GetHotelById(parseInt(hotelID))
            .subscribe(data => {
                console.log(data);
                this.cardImageBase64arr = data.image != null ? data.image.split('^') : [];
                this.workingDaysArr = data.workingDays != null ? data.workingDays.split(';') : [];
                const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;
                for (let i = 0; i < this.workingDaysArr.length; i++) {
                    checkArray.push(new FormControl(this.workingDaysArr[i]));
                }
                this.editForm.patchValue(data);
            });

    }

    isChecked(val: string) {
        const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;
        var res = false
        checkArray.controls.forEach((item: FormControl) => {
            if (item.value == val) {
                res = true;
            }
        });
        return res;
    }

    onCheckboxChange(e) {
        const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;

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
        this.editForm.controls["workingDays"].setValue(value);
    }

    onSubmit() {
        debugger;
        console.log(this.editForm.value);
        this.apiService.UpdateHotel(this.editForm.value)
            .subscribe(data => {
                this.router.navigate(['ListHotel']);
            });
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
        this.editForm.controls['image'].setValue(imageToDB);
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
                    this.editForm.controls['image'].setValue(imageToDB);
                    //}
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

}
