import { Component, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public res: string[];
    public subtitle: string;
    constructor(private router: Router) {

    }
    public navToList(to: number) {
        if (to === 1) {
            this.router.navigate(['ListCategory']);
        }
        else if (to === 2) {
            this.router.navigate(['ListSubCategory']);
        }
        else if (to === 3) {
            this.router.navigate(['ListHotel']);
        }
        else if (to === 4) {
            this.router.navigate(['ListItem']);
        }
    }
    title = 'Welcome to Angular';

}
