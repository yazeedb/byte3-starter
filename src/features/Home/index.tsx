import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as homeState from './state';
import './style.css';
import { bindActionCreators } from 'redux';

type ReduxProps = ConnectedProps<typeof withRedux>;

interface HomeComponentProps extends ReduxProps {}

const HomeComponent: React.FC<HomeComponentProps> = ({ state, actions }) => {
  return (
    <div className="home">
      <h1>Count: {state}</h1>

      <button onClick={actions.inc}>Inc</button>
      <button onClick={actions.dec}>Dec</button>
    </div>
  );
};

const withRedux = connect(homeState.getState, (dispatch) => ({
  actions: bindActionCreators(homeState.actions, dispatch)
}));

export const Home = withRedux(HomeComponent);
