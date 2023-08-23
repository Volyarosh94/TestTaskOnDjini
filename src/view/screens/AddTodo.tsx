import React, {useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Todo, todoActions} from '../../redux/slices/todoSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {doc, setDoc} from '@firebase/firestore';
import db from '../../../firebase';
import Animated, {FadeInDown, FadeInLeft} from 'react-native-reanimated';

const AddTodo = () => {
  const tailwind = useTailwind();
  const [name, setName] = useState<string>('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo);
  const todoId =
    todos.todo.length > 0 ? todos.todo[todos.todo.length - 1].id + 1 : 1;
  const handleAdd = async () => {
    if (name.trim() !== '') {
      const newTodo: Todo = {id: todoId, name, completed: false};
      // const newTodo: Todo = {id: Date.now(), name, completed: false};
      dispatch(todoActions.addTodo(newTodo));
      const docRef = doc(db, 'todos', `${todoId}`);
      await setDoc(docRef, newTodo);
      setName('');
    }
  };

  return (
    <SafeAreaView style={tailwind('bg-indigo-200 flex-1')}>
      <Text style={tailwind('text-2xl mb-6 p-3')}>Add Todo</Text>

      <TextInput
        placeholder="Enter task"
        value={name}
        onChangeText={newName => setName(newName)}
        style={tailwind('border border-gray-400 p-4 mb-5')}
      />
      <Button title="Add" onPress={handleAdd} />
    </SafeAreaView>
  );
};

export default AddTodo;
