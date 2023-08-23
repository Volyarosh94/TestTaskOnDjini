import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Todo, todoActions} from '../../redux/slices/todoSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {doc, deleteDoc, setDoc} from '@firebase/firestore';
import db from '../../../firebase';
import {FadeInLeft} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
interface TodoItemProps {
  item: Todo;
}

const TodoItem: FC<TodoItemProps> = ({item}) => {
  const tailwind = useTailwind();

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo);
  const handleToggleComplete = async () => {
    dispatch(todoActions.toggleComplete(item.id));
    const docRef = doc(db, 'todos', `${item.id}`);
    const currTodo = todos.todo.find(todo => todo.id === item.id);
    console.log('asd', currTodo);
    const payload = {
      ...currTodo,
      completed: !currTodo?.completed,
    };
    await setDoc(docRef, payload);
  };

  const handleDelete = async () => {
    dispatch(todoActions.deleteTodo(item.id));
    const docRef = doc(db, 'todos', `${item.id}`);
    await deleteDoc(docRef);
  };

  return (
    <Animated.View
      entering={FadeInLeft.duration(400)}
      style={tailwind(
        'flex-row justify-between items-center p-3 border-b border-gray-400',
      )}>
      <TouchableOpacity onPress={handleToggleComplete}>
        <Text
          style={tailwind(
            item.completed
              ? 'line-through text-gray-500 text-lg'
              : 'text-black text-lg',
          )}>
          {item.id}) {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={tailwind('text-red-500')}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TodoItem;
