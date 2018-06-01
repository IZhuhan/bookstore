import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Router} from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Book } from "../../models/Book";


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book = {
    name: '',
    date: `${new Date()}`,
    description: '',
    price: 0,
    author: '',
    links: [
      {
        type: 'epub',
        link: ''
      },
      {
        type: 'pdf',
        link: ''
      }
    ]
  };

  constructor(
    public booksService: BooksService,
    public router: Router,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  addBook() {
    this.booksService.addBook(this.book)
      .then(() => {
          this.flashMessages.show(`Book "${this.book.name}" has been successfully added!`, {
            cssClass: 'alert-success',
            showCloseBtn: true,
            closeOnClick: true,
            timeout: 10000
          });

          this.router.navigate(['/panel']);
        }, error => {
          this.flashMessages.show(error.message, {
            cssClass: 'alert-danger',
            showCloseBtn: true,
            closeOnClick: true,
            timeout: 10000
          });
        });
  }
}
