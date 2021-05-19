import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

@Pipe({
  name: 'filterCatalog'
})
export class FilterCatalogPipe implements PipeTransform {

  transform(products: IProduct[] | null,  categoryId: string | null): IProduct[] | null {
    if (!categoryId) {
      return products;
    }
    return products?.filter((product: IProduct) => product.category?._id === categoryId) || [];
  }

}
