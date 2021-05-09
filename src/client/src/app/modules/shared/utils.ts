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
