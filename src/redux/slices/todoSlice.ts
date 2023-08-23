import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

interface IState {
  todo: Todo[];
}

const initialState: IState = {
  todo: [],
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todo = [...action.payload];
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = [...state.todo, action.payload];
      AsyncStorage.setItem('todos', JSON.stringify(state.todo));
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todo.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        AsyncStorage.setItem('todos', JSON.stringify(state.todo));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter(item => item.id !== action.payload);
      AsyncStorage.setItem('todos', JSON.stringify(state.todo));
    },
  },
});

const {actions, reducer: todoReducer} = slice;
const todoActions = {
  ...actions,
};
export {todoActions, todoReducer};
