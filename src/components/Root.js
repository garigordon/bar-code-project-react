import React from 'react'
import {Provider} from 'react-redux'
import App from './App'
import store from '../redux'
import {ConnectedRouter} from 'react-router-redux'
import history from './../history'
import '../static/styles/app.css'

const Root = () => {
    return (
        <Provider store = {store}>
            <ConnectedRouter history = {history}>
                <App />
            </ConnectedRouter>
        </Provider>
    )
}

export default Root