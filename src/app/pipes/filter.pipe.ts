import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: IProduct[] | null, searchText: string): IProduct[] | null {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it: IProduct) => {
      return it.name?.toLocaleLowerCase().includes(searchText);
    });
  }

}
