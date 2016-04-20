import {Component, Input, EventEmitter, Self, Output, Injectable, ElementRef} from "angular2/core";

import {ControlValueAccessor, NgModel} from 'angular2/common';

@Component({
  selector: "s-rating[ngModel]",
  template: `
<div class="ui rating" [class.star]="type === 'star'" [class.heart]="type === 'heart'" [ngClass]="size">
  <i class="icon" *ngFor="#item of rates,#index=index" [class.active]="item.active" (click)="rate(index + 1)"></i>
</div>`
})
@Injectable()
export class Rating implements ControlValueAccessor {

  public vm: NgModel;

  private value: number;

  private nativeElement: any;

  private rates: Array<any>;

  @Input()
  public readonly: boolean;

  @Input()
  public max: number;

  @Input()
  public type: string;

  @Input()
  public size: string;
  
  public constructor(vm: NgModel, templateRef: ElementRef) {
    this.vm = vm;
    vm.valueAccessor = this;
    this.nativeElement = templateRef.nativeElement;
  }

  //region 以下三个方法是实现ControlValueAccessor
  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
  //endregion

  public ngOnInit(): void {
    this.rates = [];
    for (let i = 0; i < this.max; i++) {
      let item = {};
      if (i <= this.value) {
        item.active = true;
      }
      this.rates.push(item);
    }
  }
  private rate(val: number): void {
    if (!this.readonly && val > 0 && val <= this.max) {
      this.rates.forEach((item, i) => {
        item.active = (i < val);
      });
      this.writeValue(val);
      this.vm.viewToModelUpdate(val);
    }
  }
} 