import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: any
  ) { }

  ngOnInit(): void {    
  }

  ngAfterViewInit() {
  
  }

}
