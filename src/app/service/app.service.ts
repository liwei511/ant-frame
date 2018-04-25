import { Component, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service {
    platform = 'devsite';
    options: any;
    baseUrl = 'https://api2.huayingjuhe.com/';
    constructor(private http: HttpClient) {
        this.getData('sys/list_options').subscribe({
            next: res => {
              this.options = res['result'];
            }
          });
    }
    postData(api, params: any) {
        const __this = this;
        const headers = new HttpHeaders().set('Content-Type', 'text/plain'); // 带options请求
        return Observable.create(function(observer) {
            __this.http.post(__this.baseUrl + api, params, {headers}).subscribe((res: any) => {
                observer.next(res);
            },
            error => {},
            () => {}
            );
        });
    }
    getData(api) {
        const __this = this;
        return Observable.create(function(observer) {
            __this.http.get(__this.baseUrl + api).subscribe((res: any) => {
                observer.next(res);
            },
            error => {},
            () => {}
            );
        });
    }
}
