import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Configuration} from "../configuration.models";
import {ConfigurationService} from "../configuration.service";
import {ViewState} from "../../shared/model/view-state.model";

@Component({
  selector: 'app-configuration-input',
  templateUrl: './configuration-input.component.html',
  styleUrls: ['./configuration-input.component.scss']
})
export class ConfigurationInputComponent implements OnInit, OnChanges {
  @Input() parentForm?: FormGroup;
  @Input() configuration: Configuration = {} as Configuration;
  @Input() type: string = 'text';
  @Input() key: string = '';
  @Input() label: string = '';
  @Output() configurationChange: EventEmitter<Configuration> = new EventEmitter<Configuration>();

  fm = new FormGroup({});
  state: ViewState = new ViewState();


  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.parentForm?.addControl(this.key, this.fm);
  }

  init(configuration: Configuration = {} as Configuration): void {
    this.fm.setControl('key', new FormControl(configuration.key, []))
    this.fm.setControl('value', new FormControl(configuration.value, []))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.configuration) {
      this.init(this.configuration);
    }
  }


  submitConfiguration() {
    this.fm.disable();
    this.configurationService.submitConfiguration(this.fm.value)
      .then(
        value => {
          this.state.ready();
          this.fm.enable();
          this.configuration = value;
          this.init(this.configuration);
          this.configurationChange.emit(value);
        },
        error => {
          this.state.error(error.message);
          this.fm.enable();
        }
      )
  }

}
