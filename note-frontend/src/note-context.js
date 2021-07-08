import React, { createContext, useReducer } from 'react';

import reducer, { initialState } from './store/reducer/auth';

export const NoteContext = createContext();

const Store = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {props.children}
        </NoteContext.Provider>
    );
};

const withState = (Child) => (props) => (
    <NoteContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </NoteContext.Consumer>
);

export { Store, withState };