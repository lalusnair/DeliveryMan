import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HotelService } from "../../../Services/hotel.service";
import { debug } from 'util';

@Component({
    selector: 'app-view-hotel',
    templateUrl: './view-hotel.component.html',
    styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: HotelService) { }

    editForm: FormGroup;
    cardImageBase64arr: string[] = [];

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
            isActive: ['', Validators.required],
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
    backToList() {
        this.router.navigate(['ListHotel']);
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
