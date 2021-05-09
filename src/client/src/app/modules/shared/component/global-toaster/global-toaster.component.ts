import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalToasterMessage, GlobalToasterMessageType, GlobalToasterService} from "./global-toaster.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-global-toaster',
  templateUrl: './global-toaster.component.html',
  styleUrls: ['./global-toaster.component.scss']
})
export class GlobalToasterComponent implements OnInit, OnDestroy {
  messages$?: Subscription;
  messages: GlobalToasterMessage[] = [];


  constructor(private globalToasterService: GlobalToasterService) {

  }

  ngOnInit(): void {
    this.messages$ = this.globalToasterService.getMessages()
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  getCssClass(type: GlobalToasterMessageType) {
    switch (type) {
      case GlobalToasterMessageType.SUCCESS:
        return 'bg-success text-light';
      case GlobalToasterMessageType.ERROR:
        return 'bg-danger text-light';
      case GlobalToasterMessageType.INFO:
      default:
        return '';
    }
  }

  removeMessage(message: GlobalToasterMessage) {
    this.messages = this.messages.filter(m => m !== message)
  }

  ngOnDestroy(): void {
    this.messages$?.unsubscribe();
  }


}
