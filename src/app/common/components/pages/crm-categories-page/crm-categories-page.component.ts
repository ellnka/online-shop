import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-crm-categories-page',
  templateUrl: './crm-categories-page.component.html',
  styleUrls: ['./crm-categories-page.component.sass']
})
export class CrmCategoriesPageComponent implements OnInit {

  categories: ICategory[] = [];
  loading: boolean = false;
  form: FormGroup;
  aSub: Subscription = new Subscription();
  image: File | undefined = undefined;
  imagePreview: any = '';

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.email]),
      description: new FormControl(null),
      image: new FormControl(null),
      _id: new FormControl(null),
      __v: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.aSub = this.categoryService.fetchAll().subscribe(
      categories => {
       this.categories = categories; 
      },
      error => {
        // TODO: handle error
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();

    const category: ICategory = {
      name: this.form.value.name,
      description: this.form.value.description,
    };
    
    if (this.form.value._id) {
      category._id = this.form.value._id;
      this.aSub = this.categoryService.update(category, this.image).subscribe(
        category => {
          const index = this.categories.findIndex(p => p._id === category._id);
          this.categories[index] = category;
          this.form.enable();
        },
        error => {
          // TODO: handle error
          this.form.enable();
        });
    } else {
      this.aSub = this.categoryService.create(category, this.image).subscribe(
        category => {
         this.categories.push(category); 
         this.form.enable();
        },
        error => {
          // TODO: handle error
          this.form.enable();
        });
    }
  }

  onSelectCategory(category: ICategory) {
    delete category.imageSrc;
    this.form.setValue({
      image: null,
      ...category
    });
  }

  onDeleteCategory(category: ICategory) {
    this.aSub = this.categoryService.delete(category).subscribe(
      response => {
        const index = this.categories.findIndex(p => p._id === category._id);
        this.categories.splice(index, 1);
      });
  }

  onFileSelect(event: any) {
    const file = event?.target?.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }


}
