import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Order } from "../models/Order";

@Injectable()
export class SalesService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDoc: AngularFirestoreDocument<Order>;
  orders: Observable<Order []>;
  order: Observable<Order>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.ordersCollection = this.afs.collection('orders');
  }

  getOrders() {
    return this.orders = this.ordersCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Order;
        data.id = document.payload.doc.id;

        return data;
      });
    });
  }

  addNewOrder(order) {
    return this.ordersCollection.add(order);
  }

  editOrder(order) {
    return this.afs.doc(`orders/${order.id}`).update(order);
  }
}
