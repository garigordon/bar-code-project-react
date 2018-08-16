import {APP_NAME} from '../../settings'
import {replace} from 'react-router-redux'
import {routePathnameSelector} from './_helpers'
/**
 * Constants
 * */
export const moduleName = 'userLogin'
const prefix = `${APP_NAME}/${moduleName}`
export const CHANGE_LOGIN_FIELD = `${prefix}/CHANGE_LOGIN_FIELD`
export const RESET_LOGIN_FIELDS_STATE = `${prefix}/RESET_LOGIN_FIELDS_STATE`
export const CHANGE_LOGIN_FORM_STATE = `${prefix}/CHANGE_LOGIN_FORM_STATE`
export const SAVE_LOGIN_FORM_STATE =  `${prefix}/SAVE_LOGIN_FORM_STATE`
export const ERROR_LOGIN_FORM_STATE =  `${prefix}/ERROR_LOGIN_FORM_STATE`
export const SAVE_AUTH_USER =  `${prefix}/SAVE_AUTH_USER`

/**
 * reducer
 * */

const defaultLoginFields = {
    email : "",
    password : "",
}

const defaultLogin = {
    fields : defaultLoginFields,
    formState : {
        isTouched : false,
        error : "",
    }
}

const defaultAuthedUser = {
    //id : null,
    email : "",
    name : "",
    //auth_token : null,
}

const defaultState = {
    login : defaultLogin,
    authedUser : defaultAuthedUser,
}


const reducer = (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case CHANGE_LOGIN_FIELD : {
            let {fieldName, fieldValue} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    fields : {
                        ...state.login.fields,
                        [fieldName] : fieldValue,
                    }
                }
            }
            break
        }
        case CHANGE_LOGIN_FORM_STATE : {
            let {isTouched} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    formState : {
                        ...state.login.formState,
                        isTouched : isTouched
                    }
                }
            }
            break
        }
        case RESET_LOGIN_FIELDS_STATE : {
            return {
                ...state,
                login : {
                    ...state.login,
                    fields : defaultLoginFields
                }
            }
            break
        }
        case SAVE_LOGIN_FORM_STATE : {
            let {fieldName, fieldValue} = payload
            return {
                ...state,
                authedUser : {
                    ...state.authedUser,
                    [fieldName] : fieldValue,
                }
            }
            break
        }
        case SAVE_AUTH_USER : {
            let {changeData = []} = payload
            let authedUser = {}
            changeData.forEach(chd => {
                let {key, value} = chd
                authedUser = {
                    ...authedUser,
                    [key] : value,
                }
            })
            return {
                ...state,
                authedUser : {
                    ...state.authedUser,
                    ...authedUser
                }
            }
            break
        }
        case ERROR_LOGIN_FORM_STATE : {
            let error = payload.error
            // let {error} = payload
            return {
                ...state,
                login : {
                    ...state.login,
                    formState : {
                        ...state.login.formState,
                        error : error
                    }
                }
            }
            break
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

export const loginFieldSelector = (state, fieldName) => {
    return state[moduleName].login.fields[fieldName]
}

export const errorFormStateSelector = (state) => {
    return state[moduleName].login.formState.error
}


export const userIsAuthSelector = (state) => {
    let userIsAuth = state[moduleName].authedUser.email
    return !!userIsAuth
}

/**
 * Action creators
 * */

export const changeLoginField = (fieldName, fieldValue) => {
    return {
        type : CHANGE_LOGIN_FIELD,
        payload : {
            fieldName : fieldName,
            fieldValue : fieldValue
        }
    }
}

export const resetLoginFields = () => {
    return {
        type : RESET_LOGIN_FIELDS_STATE,
    }
}

export const errorLoginFields = (text) => {
    return {
        type : ERROR_LOGIN_FORM_STATE,
        payload : {
            error : text,
        }
    }
}

export const saveAuthUser = changeData => {
    return {
        type : SAVE_AUTH_USER,
        payload : {
            changeData : changeData
        }
    }
}

/**
 * Thunk
 * */
export const checkAndLoginUser = params => (dispatch, getState) => {
    let state = getState()
    let password = loginFieldSelector(state, "password")
    let email = loginFieldSelector(state, "email")

    if (!_checkLoginEmpty({email, password})) {
        dispatch(errorLoginFields("Fill all input fields"))
        return
    }

    fetch("https://reqres.in/api/login", {
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify({
            email : email, // "root",
            password : password, // "cityslicka"
        })
    })
        .then(response => {
            if (response.status >= 400) throw new Error(response.statusText)
            return response.json()
        })
        .then(response => {
            dispatch(resetLoginFields())
            dispatch(saveAuthUser([
                {
                    key : "email",
                    value : email,
                }
            ]))

            let redirectTo = routePathnameSelector(state)
            dispatch(replace(redirectTo))

            dispatch(errorLoginFields(""))
        })
        .catch(error => {
            let msg = typeof error === 'object'
                        ? error.message :
                            typeof error === "string" ?
                                error :
                                "something went wrong"
            dispatch(errorLoginFields(msg))
        })
}

const _checkLoginEmpty = (params) => {
    let {password, email} = params
    if(!email || !password){
        return false
    }else {
        return true
    }
}