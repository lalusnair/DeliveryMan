import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
        });

        this.apiService.GetHotelById(parseInt(hotelID))
            .subscribe(data => {
                console.log(data);
                this.editForm.setValue(data);
            });

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
