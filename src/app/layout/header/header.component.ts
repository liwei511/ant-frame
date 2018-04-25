import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nz-header>
      <div class="logo">华影聚合</div>
      <ul nz-menu [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
        <li nz-submenu style="float:right;">
          <span title>
            <i class="anticon anticon-user"></i>
            <span>管理员</span>
          </span>
          <ul>
            <li nz-menu-item><a href="https://www2.huayingjuhe.com/console/home">退出登录</a></li>
          </ul>
        </li>
        <li nz-menu-item style="float:right;">消息中心</li>
      </ul>
    </nz-header>
  `,
  styles: [
    `.logo {
      width: 100px;
      height: 31px;
      background: rgba(255,255,255,.2);
      margin: 16px 28px 16px 0;
      float: left;
      text-align: center;
      line-height: 30px;
      font-size: 20px;
      color: #fff;
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
