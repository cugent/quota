import { combineReducers, createStore } from "redux";
const initialState = {
  authors: []
};

export const updateCount = payload => ({
  type: "UPDATE_COUNT",
  payload // <-- action.type
});
export const updateAuthors = payload => ({
  type: "UPDATE_AUTHORS",
  payload // <-- action.type
});

export const authors = (state = initialState.authors, action) => {
  switch (action.type) {
    case "UPDATE_AUTHORS":
      return action.payload;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  authors
});

export function configureStore() {
  // initialState = initialState | {}
  const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  console.log(store);
  return store;
}

export const store = configureStore();
