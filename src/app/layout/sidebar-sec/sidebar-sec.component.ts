import { Component, OnInit } from '@angular/core';
import {menu} from './data';

@Component({
  selector: 'app-sidebar-sec',
  template: `
    <nz-layout style="height:100%">
      <nz-sider [nzWidth]="180" style="background:#fff;overflow-y:auto;" nzCollapsible [(nzCollapsed)]="isCollapsed" [nzCollapsedWidth]="0" [nzBreakpoint]="'md'">
        <ul nz-menu [nzMode]="'inline'" style="height:100%">
          <ng-container *ngFor="let f of userData.auth;let i=index;">
            <li nz-submenu *ngIf="menu[f].items">
              <span title><i class="anticon {{menu[f].icon}}"></i><span class="nav-text">{{menu[f].name}}</span></span>
              <ul>
                <li nz-menu-item *ngFor="let item of Object.keys(menu[f].items)">
                  <a [routerLink]="[menu[f].items[item].route]">
                    {{menu[f].items[item].name}}
                  </a>
                </li>
              </ul>
            </li>
            <li nz-menu-item *ngIf="!menu[f].items">
              <a [routerLink]="[menu[f].route]">
                <span title>{{menu[f].name}}</span>
              </a>
            </li>
          </ng-container>
        </ul>
      </nz-sider>
    </nz-layout>
  `,
  styles: []
})
export class SidebarSecComponent implements OnInit {
  isCollapsed = false;
  userData = {auth: []};
  menu;
  Object = Object;
  constructor() { }

  ngOnInit() {
    this.menu = menu;
    this.userData['auth'] = ['cinema', 'halls', 'xxxx'];
  }
}
