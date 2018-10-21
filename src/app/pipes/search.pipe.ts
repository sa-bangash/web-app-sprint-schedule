import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[] = [], searchText: any = '', key?: string): any {

    if (!searchText) {
      return value;
    }
    if (key) {
      return value.filter((item) => typeof item[key] === 'string' && item[key].toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    }
    return value.filter((item) => item === searchText)
  }

}
