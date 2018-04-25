import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { menu } from './data';

@Component({
  selector: 'app-sidebar-main',
  template: `
  <nz-layout style="height:100%">
    <nz-sider [nzWidth]="180" nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate" [nzCollapsedWidth]="80" [nzBreakpoint]="'lg'">
      <div class="sider_trigger" (click)="isCollapsed=!isCollapsed">
      <i class="anticon trigger"
        [class.anticon-menu-fold]="!isCollapsed" [class.anticon-menu-unfold]="isCollapsed"></i>
      </div>
      <ul nz-menu [nzMode]="'inline'" style="height:100%"  [nzTheme]="'dark'" [nzInlineCollapsed]="isCollapsed">
        <li nz-menu-item *ngFor="let r of userData.role" (click)="goto(r)" [ngClass]="{'ant-menu-item-selected':r==platform}">
          <span title><i class="anticon {{menu[r].icon}}"></i><span class="nav-text">{{menu[r].name}}</span></span>
        </li>
      </ul>
    </nz-sider>
  </nz-layout>
  `,
  styles: [
    `
    .sider_trigger{
      text-align: center;
      color:#fff;
      background-color: #0e2a44;
      padding: 8px 7px;
    }
    `
  ]
})
export class SidebarMainComponent implements OnInit {
  platform = 'cinema'; // 当前平台的名字，应与 service中定义的 统一。
  menu: any;
  userData = {role: []};
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  constructor() { }

  ngOnInit() {
    this.menu = menu; // 需要定位主菜单 ant-menu-item-selected
    this.userData['role'] = ['home', 'dev_panel', 'supervision', 'cinema', 'acct_org']; // 请求api
  }

  goto(mod) {
    // 处理cookie
    window.location.href = this.menu[mod].url;
  }

}
