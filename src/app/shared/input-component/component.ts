import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Optional, EventEmitter, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, UntypedFormControl, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'input-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputComponent
    }
  ]
})

export class InputComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  _integer = false;
  _positive = false;
  _disabled = false;

  _readonly = false;
  _type: string = 'text';

  _hint: string = '';
  _pattern: string = '';

  _placeholder!: string;
  _controlName!: string;
  _rows!: string;
  _icon!: string;
  _iconRight!: string;
  _button!: string;

  submitSubscription!: Subscription | undefined;
  changeSubscription!: Subscription | undefined;

  _control!: AbstractControl | null;

  items: IObjectKeys[] = [];
  types = {
    number: 'number',
    textarea: 'textarea',
    date: "date"
  }

  @Output() action = new EventEmitter()

  constructor(
    private change: ChangeDetectorRef,
    @Optional() private formDirective: FormGroupDirective,
  ) { }

  ngOnInit() {

    this.submitSubscription = this.formDirective.ngSubmit.subscribe(() => {
      this.validate();
      this.change.markForCheck();
    });

    if (this.formDirective) {
      if (this.controlName) {

        this._control = this.formDirective.control.get(this.controlName);
        this.changeSubscription = this._control?.statusChanges?.subscribe((d) => {
          this.change.markForCheck();
        });

      } else {
        console.log('Missing controlName directive from host element of the component');
      }
    } else {
      console.log('Can\'t find parent FormGroup directive');
    }

  }

  ngOnDestroy() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }

  get isSubmited(): boolean {
    return this.formDirective?.submitted;
  }

  get control() {
    return (this._control as UntypedFormControl);
  }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  get disabled() {
    return this._disabled;
  }

  @Input()
  set iconRight(iconRight: string) {
    this._iconRight = iconRight;
  }

  get iconRight() {
    return this._iconRight;
  }

  @Input()
  set icon(icon: string) {
    this._icon = icon;
  }

  get icon() {
    return this._icon;
  }

  @Input()
  set button(button: string) {
    this._button = button;
  }

  get button() {
    return this._button;
  }

  @Input()
  set pattern(pattern: string) {
    this._pattern = pattern;
  }

  get pattern() {
    return this._pattern;
  }

  @Input()
  set positive(positive: boolean) {
    this._positive = positive;
  }

  get positive() {
    return this._positive;
  }

  @Input()
  set integer(integer: boolean) {
    this._integer = integer;
  }

  get integer() {
    return this._integer;
  }

  @Input()
  set rows(rows: string) {
    this._rows = rows;
  }

  get rows() {
    return this._rows;
  }

  @Input()
  set readonly(readonly: boolean) {
    this._readonly = readonly;
    this.change.markForCheck();
  }

  get readonly() {
    return this._readonly;
  }

  @Input()
  set type(type: string) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  @Input()
  set controlName(control: string) {
    this._controlName = control;
  }

  get controlName() {
    return this._controlName;
  }

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.change.markForCheck();
  }

  get placeholder() {
    return this._placeholder;
  }

  @Input()
  set hint(hint: string) {
    this._hint = hint;
    this.change.markForCheck();
  }

  get hint() {
    return this._hint;
  }

  get value() {
    return this.control?.value;
  }

  private onChange!: (
    value: string | number | null | undefined
  ) => void;

  private onTouched!: (
    value: string | number | null | undefined
  ) => void;

  private discloseValidatorChange!: (
    value: string | number | null | undefined
  ) => void;

  writeValue(value: string) {
    this.control?.setValue(value);
  }

  registerOnChange(
    fn: (value: string | number | null | undefined) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(
    fn: (value: string | number | null | undefined) => void
  ): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    this.onTouched(this.control?.value);
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    if (this.disabled) {
      return this.control?.disable();
    }
    return this.control?.enable();
  }

  validate(): ValidationErrors | null {
    if (this.control instanceof AbstractControl) {
      return this.control.errors;
    }
    return null;
  }

  handler() {
    this.action.emit();
  }

}
