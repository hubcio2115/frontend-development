import { z } from 'zod';

const jediSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  job: z.string(),
  side: z.string(),
  weapons: z.object({
    blaster: z.string().optional(),
    lightSaber: z.string().optional(),
  }),
});
type Jedi = z.infer<typeof jediSchema>;

enum ActionTypes {
  SET_CURRENT_JEDI = 'SET_CURRENT_JEDI',
  SET_JOB = 'SET_JOB',
  FINISH_TRAINING = 'FINISH_TRAINING',
  JOIN_DARK_SIDE = 'JOIN_DARK_SIDE',
}

const reducer = (
  state: Jedi,
  action: { payload: Jedi | Jedi['job'] | undefined; type: ActionTypes },
): Jedi => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_JEDI:
      return jediSchema.parse(action.payload);
    case ActionTypes.SET_JOB:
      return jediSchema.parse({ ...state, job: action.payload });
    case ActionTypes.FINISH_TRAINING:
      return jediSchema.parse({
        ...state,
        job: 'Jedi Knight',
        weapons: { lightSaber: 'blue' },
      });
    case ActionTypes.JOIN_DARK_SIDE:
      return jediSchema.parse({
        ...state,
        job: 'Sith',
        side: 'Dark',
        weapons: { lightSaber: 'red' },
      });
    default:
      return state;
  }
};
