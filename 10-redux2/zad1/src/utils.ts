export const popFromArray = <T>(arr: T[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export const changeOnIndex = <T>(arr: T[], newThing: T, index: number) => [
  ...arr.slice(0, index),
  newThing,
  ...arr.slice(index + 1),
];
