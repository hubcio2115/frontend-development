import { z } from 'zod';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { popFromArray, changeOnIndex } from '../../utils';

const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
});
export type Todo = z.infer<typeof todoSchema>;

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    value: [
      {
        id: '1',
        title: 'Pranie',
        done: false,
      },
      {
        id: '2',
        title: 'Śmieci',
        done: true,
      },
      {
        id: '3',
        title: 'Wyjść z psem',
        done: false,
      },
      {
        id: '4',
        title: 'Kupić psu leki',
        done: true,
      },
      {
        id: '5',
        title: 'Ugotować obiad',
        done: false,
      },
    ],
  },
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.value.push(todoSchema.parse(action.payload));
    },
    deleteTodo: (state, action: PayloadAction<Todo['id']>) => {
      const todoId = todoSchema.shape.id.parse(action.payload);
      const indexOfTodo = state.value.findIndex((el) => el.id === todoId);

      if (indexOfTodo === -1) return;

      state.value = popFromArray(state.value, indexOfTodo);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = todoSchema.parse(action.payload);
      const indexOfTodo = state.value.findIndex((el) => el.id === newTodo.id);

      if (indexOfTodo === -1) return state;

      state.value = changeOnIndex(state.value, newTodo, indexOfTodo);
    },
    finishTodo: (state, action: PayloadAction<Todo>) => {
      const todoId = todoSchema.shape.id.parse(action.payload);
      const indexOfTodo = state.value.findIndex((el) => el.id === todoId);
      const newTodo = { ...state.value[indexOfTodo], done: true };

      if (indexOfTodo === -1) return;

      state.value = changeOnIndex(state.value, newTodo, indexOfTodo);
    },
  },
});
