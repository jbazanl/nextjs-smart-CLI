import { reducer } from "./reducers/reducer";
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import thunk from "redux-thunk";


export const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
//compose(applyMiddleware(thunk) ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const persistor = persistStore(store)

export default {store,persistor};
