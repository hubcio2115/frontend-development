import { z } from 'zod';

enum ActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  SET = 'SET',
}

const counter = (
  state: number,
  action: { type: ActionTypes; payload: number | undefined },
): number => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state + 1;
    case ActionTypes.DECREMENT:
      return state - 1;
    case ActionTypes.ADD:
      return state + z.number().parse(action.payload);
    case ActionTypes.SUBTRACT:
      return state - z.number().parse(action.payload);
    case ActionTypes.SET:
      return z.number().parse(action.payload);
    default:
      return state;
  }
};
