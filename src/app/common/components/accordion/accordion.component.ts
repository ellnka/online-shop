import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';

@Component({
  selector: 'accordion',
  template: `
    <ng-content></ng-content>
`,
  styleUrls: ['./accordion.component.sass']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(AccordionGroupComponent) 
  groups: QueryList<AccordionGroupComponent> | undefined;

  /**
   * Invoked when all children (groups) are ready
   */
  ngAfterContentInit() {
    if (!this.groups) {
      return;
    }

    this.groups.toArray().forEach((t) => {
      t.toggle.subscribe(() => {
        this.toogleGroup(t);
      });
    });
  }

  toogleGroup(group: AccordionGroupComponent) {
    if (!this.groups) {
      return;
    }
    group.opened = !group.opened;
  }
}
