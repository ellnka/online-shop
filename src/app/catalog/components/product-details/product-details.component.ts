import { Component, OnInit, Input } from '@angular/core';
import { EMPTY } from 'rxjs';
import {IProduct} from '../../../models/IProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: IProduct | null;
  
  constructor() {
    this.product = {
      name: ""
    };
  }

  ngOnInit(): void {
  }

}
