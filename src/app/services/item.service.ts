import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument}  from 
'@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators"
import {Item}  from "../models/Item"

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection : AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc :AngularFirestoreDocument<Item>;

  constructor(public afs:AngularFirestore) { 
  
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.

     this.itemsCollection = this.afs.collection('items' ,ref =>ref.orderBy('title','asc'))

      //this.items = this.afs.collection('items').valueChanges();


      this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a=>{
          const data = a.payload.doc.data() as Item
          data.id = a.payload.doc.id;
          return data;
        });
      }));
    

  }

  getItems(){
    return this.items;
  }

  addItem(item :Item){
      this.itemsCollection.add(item);
  }

  deleteItem(item :Item){
    this.itemDoc =this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }


  updateitem(item :Item){
    this.itemDoc =this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);

   
  }
}



