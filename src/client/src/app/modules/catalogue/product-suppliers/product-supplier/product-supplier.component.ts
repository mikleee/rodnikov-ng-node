import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductSupplier} from "../../catalogue.models";
import {ViewState, ViewStateState} from "../../../shared/model/view-state.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductSuppliersService} from "../product-suppliers.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-product-supplier',
  templateUrl: './product-supplier.component.html',
  styleUrls: ['./product-supplier.component.html']
})
export class ProductSupplierComponent implements OnInit, OnDestroy {
  supplierState: ViewState = new ViewState();
  supplierFormState: ViewState = new ViewState(ViewStateState.READY);
  supplier: ProductSupplier = {} as ProductSupplier;
  supplierForm: FormGroup = this.buildSupplierForm(this.supplier);
  logo?: File;
  logo$: Subject<File[]> = new Subject<File[]>();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private suppliersService: ProductSuppliersService) {

  }

  submitSupplierForm() {
    if (this.supplierForm.valid) {
      this.supplierForm.disable();
      this.supplierFormState.inProgress();

      let request = new FormData();
      request.append('supplier', JSON.stringify(this.supplierForm.value));
      if (this.logo) {
        request.append('logo', this.logo);
      }

      this.suppliersService.submitSupplier(request)
        .then(
          value => {
            this.supplierForm.enable();
            this.supplierFormState.ready();
            this.supplier = value;
            this.initSupplierForm(this.supplier);
          },
          reason => {
            this.supplierForm.enable();
            this.supplierFormState.error(reason.message)
          },
        );
    }
  }

  initSupplierForm(supplier: ProductSupplier | undefined) {
    this.supplierForm = this.buildSupplierForm(supplier);
  }

  buildSupplierForm(supplier: ProductSupplier | undefined) {
    return new FormGroup({
      id: new FormControl(supplier?.id, []),
      name: new FormControl(supplier?.name, [Validators.required])
    });
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

    this.logo$.subscribe(files => this.logo = files[0]);
  }

  ngOnDestroy(): void {
    this.logo$.unsubscribe();
  }


}
