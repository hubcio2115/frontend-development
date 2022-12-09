import { z } from 'zod';

const userContainerSchema = z.object({
  users: z.array(z.string()),
  currentUser: z.string(),
});
type UserContainer = z.infer<typeof userContainerSchema>;

enum UsersActionTypes {
  REPLACE = 'REPLACE',
}

const usersReduce = (
  state: UserContainer['users'],
  action: { type: UsersActionTypes; payload: UserContainer['users'] },
): UserContainer['users'] => {
  switch (action.type) {
    case UsersActionTypes.REPLACE:
      return action.payload;
    default:
      return state;
  }
};

enum CurrentUserActionTypes {
  REPLACE = 'REPLACE',
}

const currentUserReduce = (
  state: UserContainer['currentUser'],
  action: {
    type: CurrentUserActionTypes;
    payload: UserContainer['currentUser'];
  },
): UserContainer['currentUser'] => {
  switch (action.type) {
    case CurrentUserActionTypes.REPLACE:
      return action.payload;
    default:
      return state;
  }
};

type RootActionTypes = {
  users?: UsersActionTypes;
  currentUser?: CurrentUserActionTypes;
};

const root = (
  state: UserContainer,
  action: { type: RootActionTypes; payload: Partial<UserContainer> },
): UserContainer => {
  return {
    users:
      !!action.type.users && !!action.payload.users
        ? usersReduce(state.users, {
            type: action.type.users,
            payload: action.payload.users,
          })
        : state.users,
    currentUser:
      !!action.type.currentUser && !!action.payload.currentUser
        ? currentUserReduce(state.currentUser, {
            type: action.type.currentUser,
            payload: action.payload.currentUser,
          })
        : state.currentUser,
  };
};
