/* _app.js */
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { reducer } from "./reducers/reducer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux'
import Head from "next/head";

import Login from '../components/Login/Login';
import Layout from "../components/layout";
import Home from "./Home";

const store = createStore(reducer, applyMiddleware(thunk));
export const persistor = persistStore(store)
import { useSelector } from "react-redux";

function MyApp({ Component, pageProps }) {
    console.log('pageProps in MyApp',pageProps)


    return (

        <Provider store={store}>
            <PersistGate persistor = {persistor}>

                <Head>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                        crossOrigin="anonymous"
                    />
                </Head>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>

    );
}

export default MyApp