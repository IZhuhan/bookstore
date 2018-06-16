import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName: string;
  isPublic: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isPublic = event.url.indexOf('panel') === -1;
      }
    });
    this.authService.checkAuth().subscribe(auth => {
        if (auth) {
          this.userName = auth.email;
          this.isLogin = true;
        } else {
          this.userName = '';
          this.isLogin = false;
        }
    })
  }

  logout() {
    this.authService.logout()
      .then(() => {
        // this.isLogin = false;
        this.router.navigate(['/login']);
      });
  }
}
