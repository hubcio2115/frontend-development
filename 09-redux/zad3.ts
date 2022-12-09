import { z } from 'zod';

const userSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  favoriteColor: z.string(),
});
type User = z.infer<typeof userSchema>;

enum ActionTypes {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
  UPDATE_USER = 'UPDATE_USER',
}

const reducer = (
  state: User[],
  action: {
    type: ActionTypes;
    payload:
      | User
      | User['userName']
      | { username: User['userName']; updatedUser: User };
  },
): User[] => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return [...state, userSchema.parse(action.payload)];
    case ActionTypes.REMOVE_USER:
      return state.filter(
        (user) =>
          user.userName !== userSchema.shape.userName.parse(action.payload),
      );
    case ActionTypes.UPDATE_USER:
      const { userName, updatedUser } = z
        .object({
          userName: userSchema.shape.userName,
          updatedUser: userSchema,
        })
        .parse(action.payload);

      const indexOfUserToBeReplaced = state.findIndex(
        (user) => user.userName === userName,
      );
      if (indexOfUserToBeReplaced === -1) return state;

      return state.map((user, index) =>
        index === indexOfUserToBeReplaced ? updatedUser : user,
      );
    default:
      return state;
  }
};
