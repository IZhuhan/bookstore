import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Book } from "../models/Book";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BooksService {
  booksCollection: AngularFirestoreCollection<Book>;
  bookDoc: AngularFirestoreDocument<Book>;
  books: Observable<Book[]>;
  book: Observable<Book>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.booksCollection = this.afs.collection('books');
  }

  getBooks() {
    this.books = this.booksCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Book;
        data.id = document.payload.doc.id;

        return data;
      });
    });

    return this.books;
  }

  getBookById(id: string) {
    this.book = this.afs.doc(`books/${id}`).snapshotChanges().map(data => {
      const book = data.payload.data() as Book;
      book.id = data.payload.id;

      return book;
    });

    return this.book;
  }

  addBook(book: Book) {
     return this.booksCollection.add(book);
  }

  editBook(book: Book) {
    return this.afs.doc(`books/${book.id}`).update(book);
  }

  deleteBook(book: Book) {
    return this.afs.doc(`books/${book.id}`).delete();
  }
}
