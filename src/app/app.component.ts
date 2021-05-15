import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'online-shop';

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      this.auth.setToken(token);
    }
  }
}
