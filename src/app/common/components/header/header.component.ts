import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit{
  mainTitle: string = "title";
  @Input() title: string = "title";
  isAuth: boolean;

  constructor(
    private auth: AuthService,
    private router: Router) {
      this.isAuth = false;
  }

  ngOnInit() {
    this.isAuth = this.auth.isAuth();
  }


  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
