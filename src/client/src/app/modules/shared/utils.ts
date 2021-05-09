import {BaseModel} from "./model/base.model";
import {ViewState, ViewStateState} from "./model/view-state.model";
import {AsyncModel} from "./model/async.model";

export function randomNumber(): number {
  let number = Math.random() * 1_000_000;
  return Math.floor(number);
}

export function randomString(): string {
  return randomNumber().toString();
}

export function getRandomFromArray<T>(array: T[]): T {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

export function toMap<T extends BaseModel>(models: T[]): { [key: string]: T } {
  return models.reduce((a, v) => {
    a[v.id] = v;
    return a;
  }, {} as { [key: string]: T })
}

export function mapToViewStates<T extends BaseModel>(models: T[]): { [key: string]: ViewState } {
  return models.reduce((a, v) => {
    a[v.id] = new ViewState();
    return a;
  }, {} as { [key: string]: ViewState })
}

export function toAsyncModels<T>(input: T[]): AsyncModel<T>[] {
  return input.map(m => new AsyncModel(ViewStateState.UNTOUCHED, m));
}
