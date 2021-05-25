import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductSupplier} from "../../catalogue.models";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductSuppliersService} from "../product-suppliers.service";
import {BaseModel} from "../../../shared/model/base.model";

@Component({
  selector: 'app-product-supplier',
  templateUrl: './product-supplier.component.html',
  styleUrls: ['./product-supplier.component.html']
})
export class ProductSupplierComponent implements OnInit {
  supplierState: ViewState = new ViewState();
  supplierFormState: ViewState = new ViewState(ViewStateState.READY);
  supplier: ProductSupplier = {} as ProductSupplier;

  fm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl(null, [Validators.required])
  });

  logo?: File;
  logoState: ViewState = new ViewState();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private suppliersService: ProductSuppliersService) {

  }

  submitSupplierForm() {
    if (this.fm.valid) {
      this.fm.disable();
      this.supplierFormState.inProgress();

      this.suppliersService.submitSupplier(this.fm.value)
        .then(
          value => {
            this.supplier = value;
            this.initSupplierForm(this.supplier);
            this.uploadSupplierLogo()
              .then(
                value => {
                  this.fm.enable();
                  this.supplierFormState.ready();
                },
                reason => {
                  this.fm.enable();
                  this.supplierFormState.error(reason)
                },
              )
          },
          reason => {
            this.fm.enable();
            this.supplierFormState.error(reason.message)
          },
        );
    }
  }

  initSupplierForm(supplier: ProductSupplier) {
    this.fm.controls.id.setValue(supplier.id);
    this.fm.controls.name.setValue(supplier.name);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.supplierState.inProgress();
      this.suppliersService.getSupplier(id)
        .then(
          value => {
            this.supplierState.ready();
            this.supplier = value;
            this.initSupplierForm(this.supplier);
          },
          reason => this.supplierState.error(reason.message)
        );
    } else {
      this.supplierState.ready();
      this.supplier = {} as ProductSupplier;
      this.initSupplierForm(this.supplier);
    }
  }

  onSupplierLogoChange(files: File[]) {
    this.logo = files[0];
    if (this.supplier.id && this.logo) {
      this.uploadSupplierLogo();
    }
  }


  uploadSupplierLogo(): Promise<BaseModel> {
    if (this.logo) {
      let request = new FormData();
      request.append('id', this.supplier.id);
      request.append('logo', this.logo);
      this.logoState.inProgress();
      let result = this.suppliersService.uploadSupplierLogo(request);
      result.then(
        value => {
          this.logoState.ready();
          this.supplier.logo = value.id;
          this.logo = undefined;
        },
        reason => this.logoState.error(reason.message)
      );
      return result
    } else {
      return Promise.resolve({id: this.supplier.logo} as BaseModel);
    }
  }


}
