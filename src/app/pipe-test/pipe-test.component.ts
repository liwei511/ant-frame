import { Component, OnInit } from '@angular/core';
import { ToolService } from '../service/tool.service';

@Component({
  selector: 'app-pipe-test',
  templateUrl: './pipe-test.component.html',
  styleUrls: ['./pipe-test.component.scss']
})
export class PipeTestComponent implements OnInit {
  today: Date;
  money: number;
  abc: string;
  todayStr: String;
  constructor(private tool: ToolService) { }

  ngOnInit() {
    this.today = new Date();
    this.money = 9999999999.999;
    this.abc = 'abcdeFGhabc';
    this.todayStr = this.tool.formatDate(this.today);
  }

}
