import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPosition]',
})
export class PositionDirective {
  @Input() numberOfDays: number = 0;
  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    let numberOfMonths = Math.floor(this.numberOfDays / 30);
    let numberOfDays = this.numberOfDays % 30;
    let text =
      'Working for ' + numberOfMonths + ' months and ' + numberOfDays + ' days';
    this.el.nativeElement.innerText = text;
  }
}
