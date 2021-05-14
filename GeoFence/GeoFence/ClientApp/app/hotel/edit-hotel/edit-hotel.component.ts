import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HotelService } from "../../../Services/hotel.service";
import { debug } from 'util';

@Component({
    selector: 'app-edit-hotel',
    templateUrl: './edit-hotel.component.html',
    styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: HotelService) { }

    editForm: FormGroup;

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
                this.workingDaysArr = data.workingDays != null ? data.workingDays.split(';') : [];
                const checkArray: FormArray = this.editForm.get('checkArray') as FormArray;
                for (let i = 0; i < this.workingDaysArr.length; i++) {
                    checkArray.push(new FormControl(this.workingDaysArr[i]));
                }
                this.editForm.patchValue(data);
                this.editForm.setValue(data);
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

}
