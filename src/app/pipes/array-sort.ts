import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
    transform(array: Array<any>, arg?: boolean): Array<any> {
        const asc = arg ? -1 : 1;
        array.sort((a: any, b: any) => {
            if (a < b) {
                return -1 * asc;
            } else if (a > b) {
                return 1 * asc;
            } else {
                return 0;
            }
        });
        return array;
    }
}
