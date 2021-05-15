import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductAttribute, ProductAttributeTemplate} from "../../catalogue.models";
import {ProductAttributeTemplateService} from "../../product-attribute-templates/product-attribute-template.service";
import {ViewState} from "../../../shared/model/view-state.model";
import {first} from "rxjs/operators";
import {addToCollection, removeFromCollection, updateInCollection} from "../../../shared/utils";
import {Pagination} from "../../../shared/model/pagination.model";
import {forkJoin} from "rxjs";
import {ProductAttributeService} from "./product-attribute.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent implements OnInit {
  @Input() product: Product = {} as Product;
  pagination: Pagination = new Pagination();
  attributes: ProductAttributeOption[] = [];
  attributesToShow: ProductAttributeOption[] = [];
  templates: ProductAttributeTemplate[] = [];
  availableTemplates: ProductAttributeTemplate[] = [];


  newAttribute: ProductAttributeOption = {state: new ViewState()} as ProductAttributeOption;

  state: ViewState = new ViewState();

  fm = new FormGroup({});

  constructor(
    private productAttributeService: ProductAttributeService,
    private productAttributeTemplateService: ProductAttributeTemplateService
  ) {

  }

  ngOnInit(): void {
    this.state.inProgress();
    forkJoin([
      this.productAttributeTemplateService.getAttributeTemplates()
        .pipe(
          first()
        ),
      this.productAttributeService.getAttributesForProduct(this.product.id)
    ])
      .subscribe(
        value => {
          this.templates = value[0];
          this.product.attributes = value[1];
          this.init(value[0], value[1])
          this.state.ready();
        },
        error => this.state.error(error.message)
      )
  }

  init(templates: ProductAttributeTemplate[], attributes: ProductAttribute[] = []) {
    let newControl = this.buildFormSegment(this.newAttribute);
    this.fm.setControl('new', newControl);
    attributes.forEach(attr => this.fm.setControl(attr.id, this.buildFormSegment(attr)));

    this.attributes = attributes.map(attr => {
      let result = attr as ProductAttributeOption;
      result.editing = false;
      result.state = new ViewState();
      return result;
    });
    this.attributesToShow = this.pagination.getPage(this.attributes);

    let existing = this.attributes.map(a => a.template);
    this.availableTemplates = templates.filter(t => !existing.includes(t.id));
    if (this.availableTemplates.length) {
      newControl.enable();
      newControl.controls.template.setValue(undefined);
    } else {
      newControl.disable();
    }
  }

  addAttribute(fm: AbstractControl, attr: ProductAttributeOption) {
    if (fm.valid) {
      this.submitAttribute(fm, attr)
        .then(value => {
          this.newAttribute = {state: new ViewState()} as ProductAttributeOption;
          this.attributes = addToCollection(this.attributes, value as ProductAttributeOption);
          this.init(this.templates, this.attributes);
        });
    }
  }

  updateAttribute(fm: AbstractControl, attr: ProductAttributeOption) {
    if (fm.valid) {
      this.submitAttribute(fm, attr)
        .then(value => {
          this.attributes = updateInCollection(this.attributes, value as ProductAttributeOption);
          this.init(this.templates, this.attributes);
        });
    }
  }

  submitAttribute(fm: AbstractControl, attr: ProductAttributeOption): Promise<ProductAttribute> {
    attr.state.inProgress();
    fm.disable();
    let promise = this.productAttributeService.submitProductAttribute(fm.value);
    promise
      .then(
        value => {
          attr.state.ready();
          fm.enable();
        },
        error => {
          attr.state.error(error.message);
          fm.enable();
        }
      );
    return promise;
  }

  deleteAttribute(attr: ProductAttributeOption) {
    attr.state.inProgress();
    this.productAttributeService.deleteAttribute(attr.id)
      .then(
        value => {
          attr.state.ready();
          this.fm.removeControl(attr.id);
          this.attributes = removeFromCollection(this.attributes, attr.id);
          this.init(this.templates, this.attributes)
        },
        error => attr.state.error(error.message)
      )
  }

  buildFormSegment(attribute: ProductAttribute): FormGroup {
    return new FormGroup({
      id: new FormControl(attribute.id, []),
      template: new FormControl(attribute.template, [Validators.required]),
      value: new FormControl(attribute.value, [Validators.required]),
      product: new FormControl(this.product.id, [Validators.required]),
    });
  }

}

export interface ProductAttributeOption extends ProductAttribute {
  state: ViewState;
  editing: boolean;
}


