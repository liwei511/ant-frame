import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from './layout/layout.module';
import { LayoutComponent } from './layout/layout.component';
import { Service } from './service/app.service';
import { ToolService } from './service/tool.service';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { PipeTestComponent } from './pipe-test/pipe-test.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {
      path: '',
      component: LayoutComponent,
      children: [
          { path: '', redirectTo: 'pipe', pathMatch: 'full'},
          { path: 'pipe', component: PipeTestComponent },
      ]
  },
];
@NgModule({
  declarations: [
    AppComponent,
    PipeTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Service,
    ToolService,
    DatePipe
  ]
})
export class AppModule { }
