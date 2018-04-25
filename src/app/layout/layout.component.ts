import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
    ``
  ]
})
export class LayoutComponent implements OnInit {
  userData: any;
  constructor() { }

  ngOnInit() {
    this.userData = {
      role: ['dev_panel', 'home']
    };
  }

}
