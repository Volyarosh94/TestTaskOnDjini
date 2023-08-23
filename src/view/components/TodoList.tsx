// components/TodoList.tsx
import React, {FC} from 'react';
import {FlatList} from 'react-native';
import TodoItem from './TodoItem';
import {Todo} from '../../redux/slices/todoSlice';
import {useAppSelector} from '../../redux/hooks';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({todos}) => {
  const filterStatus = useAppSelector(state => state.filter);

  const filteredTodos =
    filterStatus.status === 'active'
      ? todos.filter(todo => !todo.completed)
      : filterStatus.status === 'completed'
      ? todos.filter(todo => todo.completed)
      : todos;
  return (
    <FlatList
      data={filteredTodos}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <TodoItem item={item} />}
    />
  );
};

export default TodoList;
