import {Component, OnInit} from '@angular/core';
import {Pagination} from "../../../shared/model/pagination.model";
import {Subscription} from "rxjs";
import {AsyncModel} from "../../../shared/model/async.model";
import {ProductAttributeTemplate} from "../../catalogue.models";
import {ViewStateState} from "../../../shared/model/view-state.model";
import {first, map} from "rxjs/operators";
import {toAsyncModels} from "../../../shared/utils";
import {ProductAttributeTemplateService} from "../product-attribute-template.service";

@Component({
  selector: 'app-product-attribute-templates-list',
  templateUrl: './product-attribute-templates-list.component.html',
  styleUrls: ['./product-attribute-templates-list.component.scss']
})
export class ProductAttributeTemplatesListComponent implements OnInit {
  pagination: Pagination = new Pagination();
  templates$?: Subscription;
  templates: AsyncModel<AsyncModel<ProductAttributeTemplate>[]> = new AsyncModel(ViewStateState.UNTOUCHED, []);
  templatesToShow: AsyncModel<ProductAttributeTemplate>[] = [];


  constructor(private templatesService: ProductAttributeTemplateService) {

  }


  deleteTemplate(template: AsyncModel<ProductAttributeTemplate>) {
    template.state.inProgress();
    this.templatesService.deleteTemplate(template.value.id)
      .then(
        (result) => {
          let templates = this.templates.value.filter(v => v.value.id != template.value.id);
          this.resolveTemplates(templates, ViewStateState.READY, undefined);
          template.state.ready()
        },
        (error) => template.state.error(error.message),
      )
  }

  ngOnInit(): void {
    this.templates.state.inProgress();
    this.templates$ = this.templatesService.getAttributeTemplates()
      .pipe(
        first(),
        map(v => toAsyncModels(Object.values(v)))
      )
      .subscribe(
        result => this.resolveTemplates(result, ViewStateState.READY),
        error => this.resolveTemplates([], ViewStateState.ERROR, error)
      )
  }

  ngOnDestroy(): void {
    this.templates$?.unsubscribe();
  }

  resolveTemplates(value: AsyncModel<ProductAttributeTemplate>[], state: ViewStateState, message?: string) {
    this.templates = new AsyncModel(state, value, message);
    this.templatesToShow = this.pagination.getPage(value);
  }

}
