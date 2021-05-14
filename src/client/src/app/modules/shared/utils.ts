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

export function addQueryParams<T>(input: T[]): AsyncModel<T>[] {
  return input.map(m => new AsyncModel(ViewStateState.UNTOUCHED, m));
}

export function isBlank(value: string | undefined): boolean {
  return value === undefined || value === '' || value === null;
}

export function isNotBlank(value: string | undefined): boolean {
  return !isBlank(value);
}

export function removeFromCollection<T extends BaseModel>(input: T[], id: string): T[] {
  return input.filter(m => m.id != id);
}

export function addToCollection<T extends BaseModel>(input: T[], model: T): T[] {
  input = [...input];
  input.push(model);
  return input;
}

export function updateInCollection<T extends BaseModel>(input: T[], model: T): T[] {
  input = [...input];
  input.forEach(m => {
    if (m.id === model.id) {
      Object.assign(m, model);
    }
  });
  return input;
}

export function addToBundle<T>(bundles: { [key: string]: T[] }, identifier: string, entity: T): T {
  let bundle = bundles[identifier];
  if (!bundle) {
    bundle = [];
    bundles[identifier] = bundle;
  }
  bundle.push(entity);
  return entity;
}
