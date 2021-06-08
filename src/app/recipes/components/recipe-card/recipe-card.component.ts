import { Component, Input } from '@angular/core';
import { IRecipe } from 'src/app/models/IRecipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent {
  
  @Input() recipe: IRecipe | undefined;

}
