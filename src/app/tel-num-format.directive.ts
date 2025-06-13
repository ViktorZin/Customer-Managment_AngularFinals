import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTelNumFormat]'
})
export class TelNumFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  //this directive reformats the phone numbers
  onInputChange(event: any): void {
    let input = this.el.nativeElement;
    let cleaned = input.value.replace(/\D+/g, '');

    let formatted = '';

    if(cleaned.startsWith('0')){
      formatted = `${cleaned.substr(0, 4)} ${cleaned.substr(4, 3)} ${cleaned.substr(7,11)}`;
    } else {
      formatted = cleaned;
    }

    input.value = formatted;
  }
}
