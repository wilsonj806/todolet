import React, { Context, FunctionComponent, useContext, createContext } from 'react';

const initialState = {
  user: null
};

const AppContext: Context<any> = createContext(initialState);

const AppProvider: FunctionComponent<any> = (props) => {
  // FIXME temporary
  const state = {... initialState };
  return (
    <AppContext.Provider value={{state}}>
      { props.children }
    </AppContext.Provider>
  );
}

export default AppProvider;
export { AppContext };
