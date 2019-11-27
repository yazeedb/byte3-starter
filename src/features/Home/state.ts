import { createSlice } from 'redux-starter-kit';

export const initialState = 0;

export const { actions, reducer, name } = createSlice({
  name: 'home',
  initialState,
  reducers: {
    inc: (state) => state + 1,
    dec: (state) => state - 1
  }
});
