import { Component, OnInit } from '@angular/core';
import { SalesService } from "../../services/sales.service";
import {Order} from "../../models/Order";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    public salesService: SalesService,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get all orders
    this.salesService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;

      this.orders.forEach(order => order.isEdit = false);
    });
  }

  saveChanges(order, i) {
    this.salesService.editOrder(order)
      .then(() => {
        this.flashMessages.show(`Order #${i + 1} has been successfully edited!`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      });
  }
}
