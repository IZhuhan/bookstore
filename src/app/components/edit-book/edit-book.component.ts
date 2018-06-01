import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../models/Book";
import { FlashMessagesService  } from "angular2-flash-messages";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;

  constructor(
    public booksService: BooksService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.booksService.getBookById(this.bookId).subscribe( (data: Book) => this.book = Object.assign({}, data));
  }

  editBook() {
    const updateBook = Object.assign({}, this.book);

    this.booksService.editBook(updateBook)
      .then(() => {
        this.flashMessages.show('Book has been successfully edited!', {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });

        this.router.navigate(['/panel']);
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      });
  }
}
