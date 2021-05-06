export class AsyncDropdownEvent {
  type: AsyncDropdownEventType;
  data: any;


  constructor(type: AsyncDropdownEventType, data: any) {
    this.type = type;
    this.data = data;
  }
}

export enum AsyncDropdownEventType {
  IN_PROGRESS,
  READY,
  ERROR,
  CHANGE
}

