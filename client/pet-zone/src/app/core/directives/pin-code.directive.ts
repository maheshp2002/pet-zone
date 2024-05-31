import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appIndianPinCode]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IndianPinCodeDirective, multi: true }]
})
export class IndianPinCodeDirective implements Validator {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let trimmed = input.value.replace(/\D/g, '');

    if (trimmed.length > 6) {
      trimmed = trimmed.substr(0, 6);
    }

    input.value = trimmed;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const pinCodePattern = /^[0-9]{6}$/;
    const valid = pinCodePattern.test(value);
    return valid ? null : { 'invalidPinCode': { value } };
  }
}
