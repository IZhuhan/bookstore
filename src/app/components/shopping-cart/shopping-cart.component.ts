import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems = [];

  constructor(
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    // get all cart items
    this.shoppingCartService.getCartItem().subscribe( items => this.cartItems = items);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  deleteCartItem(id) {
    this.shoppingCartService.deleteItem(id);
  }
}
