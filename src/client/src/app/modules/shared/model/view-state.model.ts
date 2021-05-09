export class ViewState {
  public _state: ViewStateState = ViewStateState.UNTOUCHED;
  private _message?: String;


  constructor(state: ViewStateState = ViewStateState.UNTOUCHED, message?: String) {
    this._state = state;
    this._message = message;
  }

  isReady(): boolean {
    return this._isState(ViewStateState.READY);
  };

  isInProgress(): boolean {
    return this._isState(ViewStateState.IN_PROGRESS);
  };

  isError(): boolean {
    return this._isState(ViewStateState.ERROR);
  };

  ready(message?: String): ViewState {
    return this.setState(ViewStateState.READY, message);
  };

  inProgress(message?: String): ViewState {
    return this.setState(ViewStateState.IN_PROGRESS, message);
  };

  error(message?: String): ViewState {
    return this.setState(ViewStateState.ERROR, message);
  };

  setMessage(message?: String) {
    this._message = message;
    return this;
  }

  getMessage() {
    return this._message;
  }

  setState(state: ViewStateState, message?: String): ViewState {
    this._state = state;
    this._message = message;
    return this;
  }

  _isState(state: ViewStateState): boolean {
    return this._state === state;
  }

}


export enum ViewStateState {
  UNTOUCHED,
  READY,
  IN_PROGRESS,
  ERROR,
}


