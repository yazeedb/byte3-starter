import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { actions, getState } from './state';
import './style.css';

type ReduxProps = ConnectedProps<typeof withRedux>;

interface HomeComponentProps extends ReduxProps {}

const HomeComponent: React.FC<HomeComponentProps> = (props) => {
  return (
    <div className="home">
      <h1>Count: {props.home}</h1>

      <button onClick={props.inc}>Inc</button>
      <button onClick={props.dec}>Inc</button>
    </div>
  );
};

const withRedux = connect(getState, actions);

export const Home = withRedux(HomeComponent);
