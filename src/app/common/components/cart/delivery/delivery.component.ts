import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit  {
  @Input()  address!: string;
  @Output() addressChange = new EventEmitter<string>();
  @Input()  phone!: string;
  @Output() phoneChange = new EventEmitter<string>();
  form: FormGroup = new FormGroup({
    phone: new FormControl(null)
  });
  constructor() {}

  ngOnInit() {
    this.form.setValue({
     phone: this.phone || ""
    });
  }

  changeAddress() {
    this.addressChange.emit(this.address);
  }

  onPhoneChane(phone: any) {
    // changes.prop contains the old and the new value...
    this.phoneChange.emit(phone);
  }
}
