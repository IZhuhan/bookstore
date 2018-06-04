import { Injectable } from '@angular/core';
import { Book } from "../models/Book";
import { of } from "rxjs/observable/of";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ShoppingCartService {
  public purchaseList: Book[] = [];
  private clearAllItemsSource = new BehaviorSubject(false);
  clearAllItemsEvent = this.clearAllItemsSource.asObservable();
  private deleteSource = new BehaviorSubject('');
  deleteItemEvent = this.deleteSource.asObservable();

  constructor() { }

  getCartItem() {
    return of(this.purchaseList);
  }

  addItem(book) {
    this.purchaseList.push(book);
    return of(book);
  }

  deleteItem(id) {
    this.purchaseList.forEach((item, i) => {
      if (item.id === id) {
        this.purchaseList.splice(i, 1);
        return;
      }
    });

    this.deleteSource.next(id);
  }

  clearCart() {
    this.purchaseList.splice(0, this.purchaseList.length);
    this.clearAllItemsSource.next(true);
  }
}
