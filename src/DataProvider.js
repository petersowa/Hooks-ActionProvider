import React, { useCallback, useReducer } from "react";

function useApp(mutations, data) {
  const dispatchAction = dispatch => mutate => payload => {
    // console.log({...{ payload, dispatch }});
    dispatch({ payload: { payload, dispatch }, mutate });
  };

  const createReducer = (state, action) => {
    if (action.mutate) return action.mutate(state, action.payload);
    return state;
  };

  const memoReducer = useCallback(createReducer, data);
  const [products, dispatch] = useReducer(memoReducer, []);

  // console.log({ products, actions, dispatch });
  const actionItems = Object.keys(mutations).reduce((acc, cv) => {
    acc[cv] = dispatchAction(dispatch)(mutations[cv]);
    return acc;
  }, {});
  return [products, actionItems];
}

function ActionProvider(props) {
  const [products, actions] = useApp(props.mutations, []);
  const { Context } = props;

  return (
    <Context.Provider value={{ products, actions }}>
      {props.children}
    </Context.Provider>
  );
}

export { ActionProvider };
