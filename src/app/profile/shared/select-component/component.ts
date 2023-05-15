import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, Output, ViewChild, EventEmitter, OnDestroy, OnInit, Optional, ChangeDetectorRef, Inject, PLATFORM_ID, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, UntypedFormControl, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { OptionComponent } from './option/component';

@Component({
  selector: 'select-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})

export class SelectComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  disabled = false;

  active = false
  _icon!: string;
  _placeholder!: string;

  _controlName!: string;
  _control!: AbstractControl | null;

  subscriptions: Subscription[] = [];
  selected !: IObjectKeys | undefined | null;
  selectedComponent !: OptionComponent;

  submitSubscription!: Subscription | undefined;
  changeSubscription!: Subscription | undefined;
  valueSubscription!: Subscription | undefined;

  @Output() change = new EventEmitter();
  @ViewChild('buttons', { static: true }) buttons!: ElementRef;
  @ViewChild('mainButton', { static: true }) mainButton!: ElementRef;

  @ContentChildren(OptionComponent) content!: QueryList<OptionComponent>;

  constructor(
    private eRef: ElementRef,
    private changeRef: ChangeDetectorRef,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() private formDirective: FormGroupDirective,
  ) { }

  get isSubmited(): boolean {
    return this.formDirective?.submitted;
  }

  get control() {
    return (this._control as UntypedFormControl);
  }

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }

  get placeholder() {
    return this._placeholder;
  }

  @Input()
  set icon(icon: string) {
    this._icon = icon;
  }

  get icon() {
    return this._icon;
  }

  @Input()
  set controlName(control: string) {
    this._controlName = control;
  }

  get controlName() {
    return this._controlName;
  }

  get value() {
    return this.control?.value;
  }

  scroll = () => {
    this.setPosition();
  }

  ngOnInit() {

    this.submitSubscription = this.formDirective.ngSubmit.subscribe(() => {
      this.validate();
      this.changeRef.markForCheck();
    });

    if (this.formDirective) {
      if (this.controlName) {

        const control = this.formDirective.control.get(this.controlName);

        this._control = control;

        this.changeSubscription = this._control?.statusChanges?.subscribe((d) => {
          this.changeRef.markForCheck();
        });

        this.valueSubscription = this._control?.valueChanges?.subscribe((d) => {
          if (d == null) {
            this.selected = null;
            this.content.forEach(e => e.selected = null);
          }
        });

      } else {
        console.log('Missing controlName directive from host element of the component');
      }
    } else {
      console.log('Can\'t find parent FormGroup directive');
    }

    if (isPlatformBrowser(this.platformId)) {
      this.window?.addEventListener("scroll", this.scroll, {
        passive: true
      });
    }

  }

  ngOnDestroy() {
    this.window?.removeEventListener('scroll', this.scroll);
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
    this.subscriptions?.map((e) => e.unsubscribe());
  }

  ngAfterContentInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setSubscriptions();
      const value = this.control.value;
      if (value != null) {
        const item = this.content.find((component) => {
          if (component.key == value) {
            component.selected = component.item;
            return true;
          }
          return false;
        });
        this.selected = item;
        this.changeRef.markForCheck();
      }

      this.content.changes.subscribe((e) => {
        this.setSubscriptions();
      });
    }
  }

  setSubscriptions() {
    this.subscriptions?.map((e) => e.unsubscribe());
    this.subscriptions = this.content.map((e) => {
      return e.select.subscribe((component) => {
        this.content.forEach(e => e.selected = component.item);
        this.select(component);
      })
    });
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

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.active = false;
      this.close();
    }
  }

  toggle() {
    if (!this.active) {
      this.open();
    } else {
      this.close();
    }

  }

  open() {
    if (this.buttons) {
      this.active = true;
      this.setPosition();
      this.buttons.nativeElement.style.opacity = '1';
      this.buttons.nativeElement.style.visibility = 'visible';
      this.buttons.nativeElement.style.height = '0px';

      const height = this.buttons.nativeElement.scrollHeight;
      this.buttons.nativeElement.style.height = `${height}px`;

    }
  }

  close() {
    if (this.buttons) {
      this.active = false;
      this.buttons.nativeElement.style.opacity = '0';
      this.buttons.nativeElement.style.visibility = 'hidden';
      this.buttons.nativeElement.style.height = '0px';
    }
  }

  setPosition() {
    const element = this.mainButton.nativeElement;
    const rect = this.mainButton.nativeElement.getBoundingClientRect();

    const top = rect.top + element.offsetHeight - 1;
    const left = rect.left;

    this.buttons.nativeElement.style.top = `${top}px`;
    this.buttons.nativeElement.style.left = `${left}px`;
    this.buttons.nativeElement.style.width = `${element.offsetWidth}px`
  }

  select(component: OptionComponent) {
    this.selected = component;
    this._control?.setValue(component.key);
    this.change.emit(component.item);
    this.close();
  }

}
