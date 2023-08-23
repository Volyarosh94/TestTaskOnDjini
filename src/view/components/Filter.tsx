import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useTailwind} from 'tailwind-rn';
import {filterActions, FilterStatus} from '../../redux/slices/filterSlice';
import Animated, {FadeInDown} from 'react-native-reanimated';

const Filter = () => {
  const tailwind = useTailwind();
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(state => state.filter);
  const handleFilterChange = (filter: FilterStatus) => {
    dispatch(filterActions.setFilterStatus(filter)); // Dispatch the action with the selected filter
  };

  return (
    <View style={tailwind('flex-row justify-around mt-4 mb-4')}>
      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <TouchableOpacity
          style={tailwind(
            `p-2 rounded border border-gray-400 w-24 	${
              filterStatus.status === 'all'
                ? 'bg-indigo-400 border-indigo-500'
                : ''
            }`,
          )}
          onPress={() => handleFilterChange('all')}>
          <Text>All</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(400).delay(400)}>
        <TouchableOpacity
          style={tailwind(
            `p-2 rounded border border-gray-400 w-24 	${
              filterStatus.status === 'active'
                ? 'bg-indigo-400 border-indigo-500'
                : ''
            }`,
          )}
          onPress={() => handleFilterChange('active')}>
          <Text>Active</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(400).delay(600)}>
        <TouchableOpacity
          style={tailwind(
            `p-2 rounded border border-gray-400 w-24 	${
              filterStatus.status === 'completed'
                ? 'bg-indigo-400 border-indigo-500'
                : ''
            }`,
          )}
          onPress={() => handleFilterChange('completed')}>
          <Text>Completed</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Filter;
