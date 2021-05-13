import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from "../../../catalogue/catalogue.models";
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {isBlank} from "../../../shared/utils";
import {ShowcaseFiltersService} from "../showcase-filters.service";

@Component({
  selector: 'app-showcase-price-filters',
  templateUrl: './showcase-price-filters.component.html',
  styleUrls: ['./showcase-price-filters.component.scss', '../showcase-filters.component.scss']
})
export class ShowcasePriceFiltersComponent implements OnInit, OnChanges {
  @Input() products?: Product[] = [];

  min?: number | undefined;
  max?: number | undefined;
  ticks: number[] = [];

  fm = new FormGroup({
    min: new FormControl(undefined, [this.rangeValidator()]),
    max: new FormControl(undefined, [this.rangeValidator()])
  })

  constructor(private showcaseFiltersService: ShowcaseFiltersService) {
  }

  ngOnInit(): void {
  }

  submitPriceFilter(fm: FormGroup) {
    if (fm.valid) {
      this.showcaseFiltersService.setPriceRange(
        fm.controls.min.value === '' ? undefined : fm.controls.min.value,
        fm.controls.max.value === '' ? undefined : fm.controls.max.value,
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.initRange(changes.products.currentValue);
    }
  }

  initRange(products: Product[]) {
    this.min = undefined;
    this.max = undefined;
    this.ticks = [];

    if (products.length) {
      products.forEach(p => {
        let priceUah = Number(p.priceUah.toFixed(2));
        if (!this.ticks.includes(priceUah)) {
          this.ticks.push(priceUah);
        }
      });
      this.ticks.sort((p1, p2) => p1 - p2);

      this.min = Math.ceil(this.ticks[0])
      this.max = Math.ceil(this.ticks[this.ticks.length - 1])

      if (!this.ticks.includes(this.min)) {
        this.ticks.unshift(this.min);
      }
      if (!this.ticks.includes(this.max)) {
        this.ticks.push(this.max);
      }
    }
  }


  rangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fmMin = this.fm?.controls.min?.value;
      if (isBlank(fmMin)) {
        return null;
      }

      const fmMax = this.fm?.controls.max?.value;
      if (isBlank(fmMax)) {
        return null;
      }

      if (+fmMin > +fmMax) {
        return {'rangePriceError': true}
      }

      return null;
    };
  }

}
