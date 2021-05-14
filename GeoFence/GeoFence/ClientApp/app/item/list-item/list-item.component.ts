import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemDetailsDTO } from 'ClientApp/app/DTOs/Item_DTO';
import { ItemService } from 'ClientApp/Services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

    private _itemService: ItemService;
    public itemData: ItemDetailsDTO[];

    constructor(private router: Router, itemService: ItemService) {
        this._itemService = itemService;
    }
    ngOnInit() {
        this._itemService.GetAllItems().subscribe(res => {
            this.itemData = res;
        });
    }

    addItem(): void {
        this.router.navigate(['AddItem']);
    };

    deleteItem(item: ItemDetailsDTO): void {
        this._itemService.DeleteItem(item.itemId).subscribe(res => {
            var idx = this.itemData.indexOf(item);
            item.isActive = item.isActive == 1 ? 0 : 1;
            this.itemData[idx] = item;
        });
    };

    editItem(item: ItemDetailsDTO): void {
        window.localStorage.removeItem("editItemId");
        window.localStorage.setItem("editItemId", item.itemId.toString());
        this.router.navigate(['EditItem']);
    };

    viewItem(item: ItemDetailsDTO): void {
        window.localStorage.removeItem("editItemId");
        window.localStorage.setItem("editItemId", item.itemId.toString());
        this.router.navigate(['ViewItem']);
    };

}
