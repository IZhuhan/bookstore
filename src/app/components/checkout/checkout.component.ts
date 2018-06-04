import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems = [];

  constructor(
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    // get all cart items
    this.shoppingCartService.getCartItem().subscribe(items => {
      if (items.length) {
        this.cartItems = items;
      }
    });
  }

  deleteItem(id) {
    this.shoppingCartService.deleteItem(id);
  }
}
