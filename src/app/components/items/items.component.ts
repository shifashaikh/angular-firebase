import { Component, OnInit } from '@angular/core';
import {ItemService}  from "../../services/item.service";
import {Item} from "../../models/Item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    items: Item[];
    editState:boolean =false;
    itemToEdit :Item;
  constructor(private itemService :ItemService) { }

  ngOnInit(): void {

    this.itemService.getItems().subscribe(items=>{
       this.items = items;
      // console.log(items);
    })
  }

  editItem(event,item :Item){
       this.editState= true;
       this.itemToEdit = item;
      //  console.log(item.id)
      //  console.log(this.itemToEdit.id)


  }
  clearState(){
    this.editState =false;
    this.itemToEdit = null;
  }

  deleteItem(event,item:Item){
      this.clearState();
    this.itemService.deleteItem(item);

  }

  updateItem(item :Item){
        
    this.itemService.updateitem(item);
    this.clearState();
  }

}
