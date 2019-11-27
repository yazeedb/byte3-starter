import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState = 0;

type IncByAction = PayloadAction<number>;

export const { actions, reducer, name } = createSlice({
  name: 'home',
  initialState,
  reducers: {
    inc: (state) => state + 1,
    incBy: (state, action: IncByAction) => state + action.payload,
    dec: (state) => state - 1,
    reset: () => initialState
  }
});

export const getState = (state: { home: typeof initialState }) => ({
  state: state.home
});
