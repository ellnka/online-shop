import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Directive({
  selector: '[appFilterHighlight]'
})
export class FilterHighlightDirective implements OnChanges {
  @Input() searchedWord: string = ''; 
  @Input() product: IProduct | undefined; 
  @Input() classToApply: string = '';
  @Input() setTitle = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.product) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'title',
        this.product.name
      );
    }
    let innerText = this.product?.name || '';

    if (this.searchedWord && this.searchedWord.length && this.classToApply) {
      innerText = this.getFormattedText();
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      `<a class="search__link" href="/product/${this.product._id}">${innerText}</a>`
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return this.product?.name.replace(re, `<span class="${this.classToApply}">$1</span>`) || '';
  }
}
