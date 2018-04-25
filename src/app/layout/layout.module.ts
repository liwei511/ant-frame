import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarMainComponent } from './sidebar-main/sidebar-main.component';
import { SidebarSecComponent } from './sidebar-sec/sidebar-sec.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';

const COMPONENTS = [
    LayoutComponent,
    HeaderComponent,
    SidebarMainComponent,
    SidebarSecComponent
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        NgZorroAntdModule
    ],
    providers: [],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
