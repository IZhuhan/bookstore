import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  books: Book[] = [];
  cartItems = [];

  constructor(
    public bookService: BooksService,
    public shoppingCartService: ShoppingCartService,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    // get all cart items
    this.shoppingCartService.getCartItem().subscribe(items => {
      if (items.length) {
        this.cartItems = items;
      }
    });
    // Get all books
    this.bookService.getBooks().subscribe( (books: Book[]) => {
      this.books = books;

      if (this.cartItems.length) {
        this.cartItems.forEach(item => {
          this.books.forEach(book => {
            if (book.id === item.id) {
              book.isAddCart = true;
            }
          });
        });
      }
    });
    // subscribe on clear
    this.shoppingCartService.clearAllItemsEvent.subscribe(status => {
      if (status) {
        this.books.forEach(book => book.isAddCart = false);
      }
    });
    // subscribe on delete book from cart
    this.shoppingCartService.deleteItemEvent.subscribe(id => {
      if (id) {
        this.books.forEach(book =>  {
          if (id === book.id) {
            book.isAddCart = false;
          }
        });
      }
    });
  }

  addBook(book) {
    const newCartItem = {
      id: book.id,
      price: book.price,
      name: book.name,
      quantity: 1
    };

    this.shoppingCartService.addItem(newCartItem).subscribe(book => {
      this.flashMessages.show(`Book "${book.name}" has been successfully added to cart!`, {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }

  deleteBook(id) {
    this.shoppingCartService.deleteItem(id);
  }
}
