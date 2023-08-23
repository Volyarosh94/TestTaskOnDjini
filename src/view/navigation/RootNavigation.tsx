import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Main from '../screens/Main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTodo from '../screens/AddTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../redux/hooks';
import {Todo, todoActions} from '../../redux/slices/todoSlice';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {
  onSnapshot,
  collection,
  QuerySnapshot,
  DocumentData,
} from '@firebase/firestore';
import db from '../../../firebase';

const RootNavigation = () => {
  const Tab = createBottomTabNavigator();
  const tailwind = useTailwind();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('todos');
        if (storedData && JSON.parse(storedData)?.length) {
          const parsedData = JSON.parse(storedData);
          dispatch(todoActions.addTodos(parsedData));
        } else {
          onSnapshot(
            collection(db, 'todos'),
            (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
              const updatedTodos = snapshot.docs.map(doc => doc.data());
              dispatch(todoActions.addTodos(updatedTodos as Todo[]));
            },
          );
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    fetchDataFromAsyncStorage();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Main'}
        screenOptions={{
          tabBarActiveTintColor: 'rgb(34,0,255)',
          tabBarInactiveTintColor: 'rgb(40,40,40)',
          tabBarActiveBackgroundColor: 'rgb(165, 180, 252)',
          tabBarInactiveBackgroundColor: 'rgb(165, 180, 252)',
        }}>
        <Tab.Screen
          name="Main"
          component={Main}
          options={() => ({
            tabBarIcon: () => <Text style={tailwind('text-2xl')}>☰</Text>,
            headerShown: false,
          })}
        />
        <Tab.Screen
          name="AddTodo"
          component={AddTodo}
          options={() => ({
            tabBarIcon: () => <Text style={tailwind('text-3xl')}>+</Text>,
            headerShown: false,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
