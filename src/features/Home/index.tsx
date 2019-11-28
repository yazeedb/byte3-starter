import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getState } from './state';
import './style.css';
import { bindActionCreators } from 'redux';
import { createSlice, PayloadAction } from 'redux-starter-kit';

/**
 *
 * body padding
 * 4 columns stretched out, 25px between each one
 * Colored headers
 */

// Add a card link under each column
// When the user clicks it, call window.prompt
// Render that card at the botto of the column

// Two buttons per card
// Leftmost cards have no left button
// Rightmost cards have no right button
// Arrows move

let globalId = 0;

const initialState = {
  first: {
    name: 'Winnie',
    cards: [
      {
        id: globalId++,
        content: 'Buy eggs from the grocery store Need at least two dozen.'
      },
      {
        id: globalId++,
        content: 'Return textbooks to campus bookstore. They are defective.'
      }
    ]
  },
  second: {
    name: 'Bob',
    cards: [
      {
        id: globalId++,
        content: 'Buy eggs from the grocery store Need at least two dozen.'
      },
      {
        id: globalId++,
        content: 'Return textbooks to campus bookstore. They are defective.'
      }
    ]
  },
  third: {
    name: 'Thomas',
    cards: [
      {
        id: globalId++,
        content: 'Buy eggs from the grocery store Need at least two dozen.'
      },
      {
        id: globalId++,
        content: 'Return textbooks to campus bookstore. They are defective.'
      }
    ]
  },
  fourth: {
    name: 'George',
    cards: [
      {
        id: globalId++,
        content: 'Buy eggs from the grocery store Need at least two dozen.'
      },
      {
        id: globalId++,
        content: 'Return textbooks to campus bookstore. They are defective.'
      }
    ]
  }
};

type AddPayload = PayloadAction<{ name: string; content: string }>;
type Card = { id: number; content: string };

type ShiftPayload = PayloadAction<{
  currentColumnKey: string;
  card: Card;
}>;

const { actions, reducer } = createSlice({
  name: 'triplebyte',
  initialState,
  reducers: {
    add: (state, action: AddPayload) => {
      const { name, content } = action.payload;

      // @ts-ignore
      const column = state[name];

      const card: Card = {
        id: globalId++,
        content
      };

      return {
        ...state,
        [name]: {
          ...column,
          cards: [...column.cards, card]
        }
      };
    },
    shiftLeft: (state, action: ShiftPayload) => {
      const { currentColumnKey, card } = action.payload;

      const columns = Object.keys(state);
      const currentIndex = columns.findIndex((v) => v === currentColumnKey);
      const previousColumnKey = columns[currentIndex - 1];

      if (!previousColumnKey) {
        return state;
      }

      // @ts-ignore
      const currentColumn = state[currentColumnKey];

      // @ts-ignore
      const previousColumn = state[previousColumnKey];

      return {
        ...state,
        [currentColumnKey]: {
          ...currentColumn,
          cards: currentColumn.cards.filter((c: Card) => c.id !== card.id)
        },
        [previousColumnKey]: {
          ...previousColumn,
          cards: [...previousColumn.cards, card]
        }
      };
    },
    shiftRight: (state, action: ShiftPayload) => {
      const { currentColumnKey, card } = action.payload;

      const columns = Object.keys(state);
      const currentIndex = columns.findIndex((v) => v === currentColumnKey);
      const nextColumnKey = columns[currentIndex + 1];

      if (!nextColumnKey) {
        return state;
      }

      // @ts-ignore
      const currentColumn = state[currentColumnKey];

      // @ts-ignore
      const nextColumn = state[nextColumnKey];

      return {
        ...state,
        [currentColumnKey]: {
          ...currentColumn,
          cards: currentColumn.cards.filter((c: Card) => c.id !== card.id)
        },
        [nextColumnKey]: {
          ...nextColumn,
          cards: [...nextColumn.cards, card]
        }
      };
    }
  }
});

const HomeComponent: React.FC<ConnectedProps<typeof withRedux>> = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="home">
      {Object.keys(state).map((key, index, sourceArray) => {
        const isFirstColumn = index === 0;
        const isLastColumn = index === sourceArray.length - 1;

        // @ts-ignore
        const value = state[key];

        return (
          <div className={`column ${key}`} key={key}>
            <header>{value.name}</header>
            {value.cards.map((card: any) => (
              <div className="card" key={card.id}>
                {!isFirstColumn && (
                  <button
                    onClick={() => {
                      const action = actions.shiftLeft({
                        currentColumnKey: key,
                        card
                      });

                      dispatch(action);
                    }}
                  >
                    {'<'}
                  </button>
                )}

                <span>{card.content}</span>

                {!isLastColumn && (
                  <button
                    onClick={() => {
                      const action = actions.shiftRight({
                        currentColumnKey: key,
                        card
                      });

                      dispatch(action);
                    }}
                  >
                    {'>'}
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                const content = window.prompt('Enter your card');

                if (content == null) {
                  return;
                }

                if (content.trim() === '') {
                  return;
                }

                const action = actions.add({
                  name: key,
                  content: content.trim()
                });

                dispatch(action);
              }}
            >
              + Add a card
            </button>
          </div>
        );
      })}
    </div>
  );
};

const withRedux = connect(getState, (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}));

export const Home = withRedux(HomeComponent);
