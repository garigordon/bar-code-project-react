import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import localData from './middlewares/localData'
import {routerMiddleware} from 'react-router-redux'
import history from './../history'


let routerMiddleWareWithHistory = routerMiddleware(history)

const enhancer = applyMiddleware(thunk, routerMiddleWareWithHistory, localData)

const store = createStore(reducer, enhancer)

// TODO dev only
window.store = store

export default store