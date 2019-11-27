import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getState, actions } from './state';
import './style.css';
import { bindActionCreators } from 'redux';

const HomeComponent: React.FC<ConnectedProps<typeof withRedux>> = ({
  state,
  actions
}) => {
  return (
    <div className="home">
      <h1>Count: {state}</h1>

      <button onClick={actions.inc}>Inc</button>
      <button onClick={actions.dec}>Dec</button>
      <button
        onClick={() => {
          actions.incBy(20);
        }}
      >
        + 20
      </button>
      <button onClick={actions.reset}>Reset</button>
    </div>
  );
};

const withRedux = connect(getState, (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}));

export const Home = withRedux(HomeComponent);
