import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../../catalogue/catalogue.models";

@Component({
  selector: 'app-showcase-categories-category-link',
  templateUrl: './showcase-categories-category-link.component.html',
  styleUrls: ['./showcase-categories-category-link.component.scss']
})
export class ShowcaseCategoriesCategoryLinkComponent implements OnInit {
  @Input() category?: ProductCategory;

  constructor() {
  }

  ngOnInit(): void {
  }

}
