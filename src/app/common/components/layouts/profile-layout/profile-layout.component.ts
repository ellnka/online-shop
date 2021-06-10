import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.sass']
})
export class ProfileLayoutComponent implements OnInit {
  links = [
    {url: '/profile/profile', name: 'Profile'},
    {url: '/profile/order-history', name: 'Order history'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
