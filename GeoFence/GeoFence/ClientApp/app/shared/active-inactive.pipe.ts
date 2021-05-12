import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'actInact'
})
export class ActiveInactivePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        console.log("valuein pipe");
        console.log(value);
        return value == 1 ? 'Active' : 'Inactive';
    }
}
