import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterStatus = 'all' | 'active' | 'completed';

interface FilterState {
  status: FilterStatus;
}

const initialState: FilterState = {
  status: 'all',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
  },
});

// export const { setFilterStatus } = filterSlice.actions;
//
// export default filterSlice.reducer;

const {actions, reducer: filterReducer} = slice;
const filterActions = {
  ...actions,
};
export {filterActions, filterReducer};
