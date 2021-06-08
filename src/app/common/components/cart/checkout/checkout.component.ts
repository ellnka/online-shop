import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;

  _totalAmount: number;
  amount: number = 0;
  card: any;
  cardError: string | null = "";
  cardHandler = this.onChange.bind(this);

  constructor(
    private cd: ChangeDetectorRef
  ) {
      this._totalAmount = this.amount;
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.initiateCardElement();
  }

  initiateCardElement() {
      // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
          
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    this.card = elements.create('card', {cardStyle});
    this.card.mount(this.cardInfo?.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({error}: {error: {message: string}}): void {
      if (error) {
          this.cardError = error.message;
      } else {
          this.cardError = null;
      }
      this.cd.detectChanges();
  }

  async createStripeToken() {
    const {token, error} = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }

  onSuccess(token: string) {
    console.log({token});
  }

  onError(error: {message: string}) {
    if (error.message) {
      this.cardError = error.message;
    }
  }

}