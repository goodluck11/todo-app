import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';

@Component({
  selector: 'todo-form-error',
  template: `
      <div style="font-size: 0.85rem" class="invalid-feedback mt-1" *ngIf="shouldShowErrors()"> {{getError()}}</div>
  `,
  styles: [`
    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      font-size: 12px;
      color: #dc3545;
    }
  `]
})
export class FormErrorComponent implements OnInit {

  static readonly errorMessages: Record<string, any> = {
    required: (params: any) => '##FIELD## is required *',
    minlength: (params: any) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
    maxlength: (params: any) => '##FIELD## should not be greater than ' + params.requiredLength + ' characters',
    pattern: (params: any) => 'Should be a valid',
    email: (params: any) => 'Invalid email *',
    validEmail: (params: any) => 'Invalid email',
    specialCharacter: (params: any) => 'No Special Characters are Allowed *',
    startsWith: (params: any) => '##FIELD## must start with ' + params.value,
    numberOnly: (params: any) => 'Only Numbers are allowed *',
    letterOnly: (params: any) => 'Only Letters are allowed *',
    min: (params: any) => '##FIELD## minimum character is ' + params.minValue,
    max: (params: any) => '##FIELD## maximum character is ' + params.maxValue,
    minDate: (params: any) => 'Date must be after the selected date',
    maxDate: (params: any) => 'Date must be before the selected date ',
    shouldBe: (params: any) => '##FIELD## must be ' + params.num + ' characters',
    shouldBeEqual: (params: any) => 'Confirm password must match password',
    confirmPassword: (params: any) => 'Passwords must match *',
    customMessage: (params: any) => params.value
  };

  formNames: Record<string, any> = {};

  @Input()
  control!: AbstractControlDirective | AbstractControl;
  @Input()
  label?: string;

  ngOnInit() {
  }

  shouldShowErrors(): boolean {
    return this.control && this.control.errors! && (this.control.dirty || this.control.touched!);
  }

  getError(): string {
    // console.log(this.control.errors);
    const errors = Object.keys(this.control.errors!).map(field => this.getMessage(field, this.control.errors![field], this.control));
    return errors[0];
  }

  private getMessage(type: string, params: any, control: any) {
    let fname = this.getControlName(control);
    for (const init in this.formNames) {
      fname = fname === init ? this.formNames[fname] : fname;
    }

    const msg = FormErrorComponent.errorMessages[type](params);
    let fieldName = fname?.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
    fieldName = this.label ? this.label : fieldName;
    return msg.replace('##FIELD##', fieldName);
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup: Record<string, any> = c.parent!.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
