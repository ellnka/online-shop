import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductPageComponent } from 'src/app/catalog/components/pages/product-page/product-page.component';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-crm-products-page',
  templateUrl: './crm-products-page.component.html',
  styleUrls: ['./crm-products-page.component.sass']
})
export class CrmProductsPageComponent implements OnInit {

  form: FormGroup;
  aSubProd: Subscription = new Subscription();
  aSubCategory: Subscription = new Subscription();
  categoryId: number = 0;
  products: IProduct[] = [];
  categories: ICategory[] = [];
  imageBig: File | undefined = undefined;
  imageSmall: File | undefined = undefined;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.email]),
      description: new FormControl(null),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      imageSmall: new FormControl(null),
      imageBig: new FormControl(null),
      category: new FormControl(0),
      _id: new FormControl(null),
      __v: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.aSubCategory = this.categoryService.fetchAll().subscribe(
      categories => {
        this.categories = categories; 
      },
      error => {
        // TODO: handle error
      });

    this.aSubProd = this.productService.fetchAll().subscribe(
      products => {
        this.products = products; 
      },
      error => {
      // TODO: handle error
    });
  }

  ngOnDestroy(): void {
    if (this.aSubCategory) {
      this.aSubCategory.unsubscribe();
    }
    if (this.aSubProd) {
      this.aSubProd.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    const product: IProduct = {
      name: this.form.value.name,
      description: this.form.value.description,
      cost: +this.form.value.cost,
      category: {
        _id: this.form.value.category,
        name: "new"
      }
    };
    if (this.form.value._id) {
      product._id = this.form.value._id;
      
      this.aSubProd = this.productService.update(product, this.imageBig, this.imageSmall).subscribe(
        product => {
          const index = this.products.findIndex(p => p._id === product._id);
          this.products[index] = product;
          this.form.enable();
        },
        error => {
          // TODO: handle error
      }); 
    } else {
      this.aSubProd = this.productService.create(product, this.imageBig, this.imageSmall).subscribe(
        product => {
          this.products.push(product); 
          this.form.enable();
        },
        error => {
          // TODO: handle error
      });
    }
  }

  onSelectProduct(product: IProduct) {
    this.form.setValue({
      ...product, 
      category: product.category || '0',
      imageBig: null,
      imageSmall: null
    });
  }

  onDeleteProduct(product: IProduct) {
    this.aSubProd = this.productService.delete(product).subscribe(
      response => {
        const index = this.products.findIndex(p => p._id === product._id);
        this.products.splice(index, 1);
    });
  }

  onFileSelect(event: any) {
    const file = event?.target?.files[0];

    if (event?.target?.name === "imageBig") {
      this.imageBig = file;
    } else {
      this.imageSmall = file;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
  }
}
