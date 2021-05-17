import {Component, OnInit} from '@angular/core';
import {Sort} from "../../../shared/model/sort.model";
import {ShowcaseFiltersService} from "../../showcase-filters/showcase-filters.service";

@Component({
  selector: 'app-showcase-sort',
  templateUrl: './showcase-sort.component.html',
  styleUrls: ['./showcase-sort.component.scss']
})
export class ShowcaseSortComponent implements OnInit {
  sortOptions = [
    {label: 'По цене', icon: 'bi-sort-down-alt', value: new Sort('price', 'asc')},
    {label: 'По цене', icon: 'bi-sort-down', value: new Sort('price', 'desc')},
    {label: 'По названию', icon: 'bi-sort-down-alt', value: new Sort('name', 'asc')},
    {label: 'По названию', icon: 'bi-sort-down', value: new Sort('name', 'desc')},
  ];
  activeOption = this.sortOptions[0];

  constructor(private showcaseFiltersService: ShowcaseFiltersService) {
  }

  ngOnInit(): void {
    this.showcaseFiltersService.setSort(this.activeOption.value)
  }


  onSortChange(option: any) {
    this.activeOption = option;
    this.showcaseFiltersService.setSort(option.value)
  }

}
