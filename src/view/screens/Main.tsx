import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import TodoList from '../components/TodoList';
import {useTailwind} from 'tailwind-rn';
import {useAppSelector} from '../../redux/hooks';
import Filter from '../components/Filter';

const Main = () => {
  const tailwind = useTailwind();
  const todos = useAppSelector(state => state.todo);
  return (
    <SafeAreaView style={tailwind('bg-indigo-200 flex-1')}>
      <Text style={tailwind('text-2xl mb-2 p-3')}>Todo List</Text>
      <TodoList todos={todos.todo} />
      <Filter />
    </SafeAreaView>
  );
};

export default Main;
