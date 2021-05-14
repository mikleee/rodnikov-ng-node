import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductAttributeTemplate, ProductSupplier} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductAttributeTemplateService} from "../product-attribute-template.service";

@Component({
  selector: 'app-product-attribute-template',
  templateUrl: './product-attribute-template.component.html',
  styleUrls: ['./product-attribute-template.component.scss']
})
export class ProductAttributeTemplateComponent implements OnInit {
  templateState: ViewState = new ViewState();
  templateFormState: ViewState = new ViewState(ViewStateState.READY);
  template: ProductAttributeTemplate = {} as ProductAttributeTemplate;
  templateForm: FormGroup = new FormGroup({
    id: new FormControl(undefined, []),
    name: new FormControl(undefined, [Validators.required])
  });


  constructor(private route: ActivatedRoute,
              private router: Router,
              private templatesService: ProductAttributeTemplateService) {
  }

  submitAttributeTemplateForm() {
    if (this.templateForm.valid) {
      this.templateForm.disable();
      this.templateFormState.inProgress();

      this.templatesService.submitTemplate(this.templateForm.value)
        .then(
          value => {
            this.templateForm.enable();
            this.templateFormState.ready();
            this.resolveTemplate(value);
          },
          reason => {
            this.templateForm.enable();
            this.templateFormState.error(reason.message)
          },
        );
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.templateState.inProgress();
      this.templatesService.getAttributeTemplate(id)
        .then(
          value => {
            this.templateState.ready();
            this.resolveTemplate(value);
          },
          reason => this.templateState.error(reason.message)
        );
    } else {
      this.templateState.ready();
      this.resolveTemplate({} as ProductSupplier);
    }

  }

  resolveTemplate(value: ProductAttributeTemplate) {
    this.template = value;
    this.templateForm.controls.id.setValue(value?.id);
    this.templateForm.controls.name.setValue(value?.name);
  }


}
