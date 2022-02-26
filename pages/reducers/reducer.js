import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {
    LOGIN,
    REGISTER,
    LOGINPROCESSING,
    REGISTERING,
    LOGOUT
} from "../actions/actionTypes.js";

let persistConfig = {
    key:'payload',
    storage,
    whitelist:['payload','loggedIn']

};



const rootReducer = (state = {} , action) => {
    console.log('********action in reducer',action);
    console.log('********state in reducer',state);
    switch (action.type) {
        case LOGIN:
            return { ...state, loggedIn: true, payload:action.payload };
            break;
        case REGISTER:
            return { ...state, registered: true, payload:action.payload };
            break;
        case LOGINPROCESSING:
            return { ...state, loginProcessing: true, payload:action.payload };
            break;
        case REGISTERING:
            return { ...state, registering: true , payload:action.payload };
            break;
        case LOGOUT:
            return { ...state, loggedIn: false , payload:{} };
            break;
        default:
            return state;
    }
};

export const reducer = persistReducer(persistConfig, rootReducer);
