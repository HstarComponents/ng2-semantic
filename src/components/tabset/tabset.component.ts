import { Component, AfterContentInit, EventEmitter, Output, Injectable } from '@angular/core';
import { Tab } from './tab.component';

@Component({
  selector: 'sm-tabset',
  template: `
<div class="ui tabular menu">
  <div class="item" [attr.data-tab]="tab.tabId" *ngFor="let tab of tabs" [class.active]="tab.active"
   [class.removable]="tab.removable" (click)="changeActiveTab(tab);">
    {{tab.heading}}
    <i class="remove circle icon" *ngIf="tab.removable" (click)="removeTab(tab)"></i>
  </div>
</div>
<ng-content></ng-content>
`,
  styles: [
    '.remove.icon.circle{margin-left: 10px !important; margin-top: -15px !important}',
    '.item.removable{padding-right: 0 !important;}',
    'i.remove.circle.icon:hover{color: red; cursor: pointer;}',
    '.ui.tabular > .item{cursor: pointer;}'
  ]
})
@Injectable()
export class Tabset implements AfterContentInit {

  private tabs: Array<Tab> = [];

  @Output() public onTabSelected = new EventEmitter(false);

  @Output() public onTabRemoved = new EventEmitter(false);

  public constructor() {
  }

  public ngAfterContentInit(): void {
    //设置默认选中第一个
    const activeTab = this.tabs.filter(tab => tab.active === true);
    if (activeTab.length === 0 && this.tabs.length > 0)
      this.tabs[0].active = true;
  }

  public changeActiveTab(tab: Tab): void {
    this.tabs.forEach(tab => tab.active = false);
    tab.active = true;
    this.onTabSelected.emit(this.tabs.indexOf(tab));
  }

  public addTab(tab: Tab): void {
    this.tabs.push(tab);
  }

  public removeTab(tab: Tab): void {
    var idx = this.tabs.indexOf(tab);
    this.tabs.splice(idx, 1);
    this.onTabRemoved.emit(tab);
    if (tab.active) {
      tab.active = false;
      this._setActiveTabAfterActiveTabRemoved(idx);
    }
  }

  private _setActiveTabAfterActiveTabRemoved(index: number): void {
    let len = this.tabs.length;
    if (len > 0) {
      this.tabs[(len > index ? index : (len - 1))].active = true;
    }
  }
}