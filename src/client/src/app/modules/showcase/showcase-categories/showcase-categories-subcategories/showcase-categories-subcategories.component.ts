import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-categories-subcategories',
  templateUrl: './showcase-categories-subcategories.component.html',
  styleUrls: ['./showcase-categories-subcategories.component.scss']
})
export class ShowcaseCategoriesSubcategoriesComponent implements OnInit {
  @Input() category: ProductCategory = {} as ProductCategory;

  constructor() {
  }

  ngOnInit(): void {
  }

}
