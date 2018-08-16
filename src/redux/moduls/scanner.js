import {APP_NAME} from '../../settings'
import {push} from 'react-router-redux'


/**
 * Constants
 * */
export const moduleName = 'scanner'
const prefix = `${APP_NAME}/${moduleName}`

export const SET_BAR_CODE = `${prefix}/SET_BAR_CODE`

/**
 * reducer
 * */

const defaultState = {
    result : ""
}

const reducer = (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case SET_BAR_CODE : {
            let {result} = payload
            return {
                ...state,
                result
            }
        }
        default : {
            return state
            break
        }
    }
}

export default reducer

/**
 * Selectors
 * */

export const scannerResultSelector = (state) => {
    return state[moduleName].result
}

/**
 * Action creators
 * */

export const scannerResultField = (result) => {
    return {
        type : SET_BAR_CODE,
        payload : {
            result : result
        }
    }
}

/**
 * Thunk
 * */

export const handleScann = content => (dispatch, getState) => {
    dispatch(scannerResultField(content))
    dispatch(push('/result'))
}

export const handleScanResset = params => (dispatch, getState) => {
    dispatch(scannerResultField(""))
    dispatch(push('/scanner'))
}