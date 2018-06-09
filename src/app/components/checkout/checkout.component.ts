import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Router } from "@angular/router";
import {SalesService} from "../../services/sales.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutList = [];
  fullName = '';
  email = '';
  phone = '';
  addressIsVisible = false;
  totalPrice = 0;

  constructor(
    public shoppingCartService: ShoppingCartService,
    public router: Router,
    public salesService: SalesService,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    // get all cart items
    this.shoppingCartService.getCartItem().subscribe(items => {
      if (!items.length) {
        this.router.navigate(['/']);
      } else {
        this.checkoutList = items;
        this.totalPrice = this.checkoutList.reduce((sum, item) => sum += +item.sum, 0);
      }
    });
  }

  onChangeItemCount(item) {
    item.sum = item.count * item.price;
    this.totalPrice = this.checkoutList.reduce((sum, item) => sum += +item.sum, 0);
  }

  deleteItem(id) {
    this.shoppingCartService.deleteItem(id);
  }

  onSubmit() {
    const newOrder = {
      fullName: this.fullName,
      phone: this.phone,
      email: this.email,
      items: this.checkoutList,
      status: "processing",
      totalPrice: this.totalPrice
    };

    this.salesService.addNewOrder(newOrder)
      .then(() => {
        this.router.navigate(['/']);

        this.flashMessages.show("We will contact you to confirm your order", {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      });
  }
}
