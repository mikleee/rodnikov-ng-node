import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {randomString} from "../../utils";

@Injectable({
  providedIn: 'root'
})
export class GlobalToasterService {
  private notifications$: Subject<GlobalToasterMessage> = new Subject<GlobalToasterMessage>();

  constructor() {
  }

  notify(message: string, type: GlobalToasterMessageType) {
    this.notifications$.next(new GlobalToasterMessage(message, type));
  }

  error(message: string) {
    this.notify(message, GlobalToasterMessageType.ERROR);
  }

  getMessages() {
    return this.notifications$;
  }

}

export class GlobalToasterMessage {
  readonly id: string = randomString();
  message: string;
  type: GlobalToasterMessageType;

  constructor(message: string, type: GlobalToasterMessageType) {
    this.message = message;
    this.type = type;
  }
}

export enum GlobalToasterMessageType {
  ERROR,
  SUCCESS,
  INFO,
}

