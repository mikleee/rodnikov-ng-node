import {ViewState, ViewStateState} from "./view-state.model";

export class AsyncModel<T> {
  state: ViewState = new ViewState();
  value: T;

  constructor(state: ViewStateState = ViewStateState.UNTOUCHED, value: T, message?: String) {
    this.state = new ViewState(state, message);
    this.value = value;
  }
}

export function toAsyncModels<T>(input: T[]): AsyncModel<T>[] {
  return input.map(m => new AsyncModel(ViewStateState.UNTOUCHED, m));
}
