import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../configuration.service";
import {ViewState, ViewStateState} from "../../shared/model/view-state.model";
import {first, map} from "rxjs/operators";
import {Configuration} from "../configuration.models";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-configuration-dashboard',
  templateUrl: './configuration-dashboard.component.html',
  styleUrls: ['./configuration-dashboard.component.scss']
})
export class ConfigurationDashboardComponent implements OnInit {
  state: ViewState = new ViewState();
  formState: ViewState = new ViewState();
  configurations: { [key: string]: Configuration } = {};
  fm: FormGroup = new FormGroup({});


  configurationTemplate = [
    {key: 'CURRENCY_USD_TO_UAH', type: 'float', label: 'Курс доллара', validators: []},
    {key: 'CURRENCY_USD_TO_UAH_SYNC_ENABLED', type: 'boolean', label: 'Включить синхронизацию курса', validators: []},
    {key: 'CURRENCY_USD_TO_UAH_SYNC_INTERVAL_MINUTES', type: 'integer', label: 'Интервал синхронизацию курса (ч)', validators: []},
    {key: 'PRICE_UPLIFT_PERCENTAGE', type: 'float', label: 'наценка на товары (%)', validators: []},
  ]


  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.state.inProgress();
    this.configurationService.getConfigurations()
      .pipe(
        first(),
        map(value => value.reduce((acc, c) => {
            acc[c.key] = c;
            return acc;
          }, {} as { [key: string]: Configuration })
        )
      )
      .subscribe(
        result => this.resolveConfigurations(result, ViewStateState.READY),
        error => this.resolveConfigurations({}, ViewStateState.ERROR, error)
      )
  }

  resolveConfigurations(value: { [key: string]: Configuration }, state: ViewStateState, message?: string) {
    this.configurations = value;
    this.state.setState(state);
    this.state.setMessage(message);
  }

  onConfigurationChanged(configuration: Configuration) {
    this.configurations[configuration.key] = configuration;
  }

  submitConfigurations() {
    if (this.fm.valid) {
      this.fm.disable()
      this.formState.isInProgress();
      let data = Object.values(this.fm.value);
      this.configurationService.submitConfigurations(data as Configuration[])
        .then(
          value => {
            this.formState.ready();
            this.fm.enable()
            value.forEach(c => this.onConfigurationChanged(c));
          },
          error => {
            this.fm.enable()
            this.formState.error(error.message)
          }
        )
    }
  }

}
