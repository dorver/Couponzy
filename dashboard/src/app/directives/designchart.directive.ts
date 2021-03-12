import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDesignchart]'
})
export class DesignchartDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
