export interface BaseModel {
  id: string
}

export function modelsToMap<T extends BaseModel>(models: T[]): { [key: string]: T } {
  return models.reduce((a, v) => {
    a[v.id] = v;
    return a;
  }, {} as { [key: string]: T })
}
