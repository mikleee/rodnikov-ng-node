import {Component, OnInit} from '@angular/core';
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {ProductGroup} from "../../catalogue.models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductGroupService} from "../product-group.service";

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {
  groupState: ViewState = new ViewState();
  groupFormState: ViewState = new ViewState(ViewStateState.READY);
  group: ProductGroup = {} as ProductGroup;
  groupForm: FormGroup = this.buildGroupForm(this.group);


  constructor(private route: ActivatedRoute,
              protected groupsService: ProductGroupService) {

  }

  submitGroupForm() {
    if (this.groupForm.valid) {
      this.groupForm.disable();
      this.groupFormState.inProgress();
      this.groupsService.submitProductGroup(this.groupForm.value)
        .then(
          value => {
            this.groupForm.enable();
            this.resolveGroup(value, ViewStateState.READY);
          },
          reason => {
            this.groupForm.enable();
            this.resolveGroup({} as ProductGroup, ViewStateState.ERROR, reason)
          },
        );
    }
  }

  buildGroupForm(group: ProductGroup | undefined) {
    return new FormGroup({
      id: new FormControl(group?.id, []),
      name: new FormControl(group?.name, [Validators.required]),
      parent: new FormControl(group?.parent)
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.groupState.inProgress();
      this.groupsService.getProductGroup(id)
        .then(
          value => this.resolveGroup(value, ViewStateState.READY),
          reason => this.resolveGroup({} as ProductGroup, ViewStateState.ERROR, reason)
        );
    } else {
      this.resolveGroup({} as ProductGroup, ViewStateState.READY)
    }
  }

  resolveGroup(value: ProductGroup, state: ViewStateState, message?: string) {
    this.groupState.setState(state);
    this.groupState.setMessage(message);
    this.group = value
    this.groupForm = this.buildGroupForm(value);
  }

  onGroupChange(group: ProductGroup) {
    this.groupForm?.controls.parent?.setValue(group?.id)
  }


}
