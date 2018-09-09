import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }
  numberValidator(c: AbstractControl): { [key: string]: boolean } | null {
    // Это если пользователь "не трогал" поле
    if (c.pristine) {
      return null;
    }
    if (c.value.match(/^\d+(?:[.]\d+)*$/)) {
      return null;
    }
    return { 'numeric': true };
  }
  telephoneValidator(c: AbstractControl): { [key: string]: boolean } | null {
    // Это если пользователь "не трогал" поле
    if (c.pristine) {
      return null;
    }
    if (c.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i)) {
      return null;
    }
    return { 'telephone': true };
  }
}
