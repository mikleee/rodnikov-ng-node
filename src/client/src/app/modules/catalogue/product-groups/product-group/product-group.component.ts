import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductGroup} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductGroupService} from "../product-group.service";
import {ProductGroupsBaseComponent} from "../product-groups-base.component";

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent extends ProductGroupsBaseComponent implements OnInit, OnDestroy {
  groupState: ViewState = new ViewState();
  groupFormState: ViewState = new ViewState(ViewStateState.READY);
  group: ProductGroup = {} as ProductGroup;
  groupForm: FormGroup = this.buildGroupForm(this.group);


  constructor(private route: ActivatedRoute,
              protected groupsService: ProductGroupService) {
    super(groupsService);
  }

  submitGroupForm() {
    if (this.groupForm.valid) {
      this.groupForm.disable();
      this.groupFormState.inProgress();
      this.groupsService.submitProductGroup(this.groupForm.value)
        .then(
          value => {
            this.groupForm.enable();
            this.groupFormState.ready();
            this.group = value;
            this.initGroupForm(this.group);
          },
          reason => {
            this.groupForm.enable();
            this.groupFormState.error(reason.message)
          },
        );
    }
  }

  initGroupForm(group: ProductGroup | undefined) {
    this.groupForm = this.buildGroupForm(group);
  }

  buildGroupForm(group: ProductGroup | undefined) {
    return new FormGroup({
      id: new FormControl(group?.id, []),
      name: new FormControl(group?.name, [Validators.required]),
      parent: new FormControl(group?.parent,)
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.groupState.inProgress();
      this.groupsService.getProductGroup(id)
        .then(
          value => {
            this.groupState.ready();
            this.group = value;
            this.initGroupForm(this.group);
          },
          reason => this.groupState.error(reason.message)
        );
    } else {
      this.groupState.ready();
      this.group = {} as ProductGroup;
      this.initGroupForm(this.group);
    }
  }

}
