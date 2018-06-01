import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/panel']);
      }
    })
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(user => {
        this.flashMessages.show(`User "${user.email}" has been successfully registrated!`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 5000
        });
        this.router.navigate(['/panel']);
      })
      .catch(err => {
        this.flashMessages.show(`${err.message}`, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 5000
        });
      });
  }
}
