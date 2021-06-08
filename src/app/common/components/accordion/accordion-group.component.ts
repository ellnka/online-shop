import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'group',
  template: `
  <div class="panel">
    <div class="title" (click)="toggle.emit()">
      <span>{{title}}</span>
      <svg [ngClass]="{'icon': true, 'rotate': !opened}" width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
  <path
    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
    fill="currentColor"
  />
</svg>
 
    </div>
    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['accordion.component.sass'],
})
export class AccordionGroupComponent {
  @Input() opened = true;
  @Input() title: string = "";

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
