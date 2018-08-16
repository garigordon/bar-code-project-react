import {APP_NAME} from "../../settings"
import {saveAuthUser} from './authUser'
import {getMockMessagesFromLocale, mockLocale} from '../../_mock/localization'
import {addLocaleData} from 'react-intl'


/**
 * Constants
 * */
export const moduleName = 'app'
const prefix = `${APP_NAME}/${moduleName}`

export const INIT_LOAD_APP = `${prefix}/INIT_LOAD_APP`
export const SET_TR_LOCALE = `${prefix}/SET_LOCALE`
export const SET_TR_MESSAGES = `${prefix}/SET_TR_MESSAGES`

const defaultTranslations = {
    locale : "en",
    messages : {},
}

const defaultState = {
    appIsInited : false,
    translations : defaultTranslations,
}

const reducer = (state = defaultState, action) => {
    const {type, payload} = action
    switch (type){
        case INIT_LOAD_APP : {
            const {appIsInited} = payload
            return{
                ...state,
                appIsInited
            }
            break
        }
        case SET_TR_LOCALE : {
            const {locale} = payload
            return {
                ...state,
                translations : {
                    ...state.translations,
                    locale
                }
            }
            break
        }
        case SET_TR_MESSAGES : {
            const {messages} = payload
            return {
                ...state,
                translations : {
                    ...state.translations,
                    messages
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

export const initAppSelector = state => {
    return state[moduleName].appIsInited
}

export const trLocaleSelector = state => {
    return state[moduleName].translations.locale
}

export const trLocaleMessagesSelector = state => {
    return state[moduleName].translations.messages
}

/**
 * Action creators
 * */
export const setAppInitedState = appIsInited => {
    return {
        type : INIT_LOAD_APP,
        payload : {
            appIsInited,
        }
    }
}

export const setTrLocale = locale => {
    return {
        type : SET_TR_LOCALE,
        payload : {
            locale
        }
    }
}

export const setTrMessages = messages => {
    return {
        type : SET_TR_MESSAGES,
        payload : {
            messages
        }
    }
}

/**
 * Thunk
 * */

export const checkAndInitApp = () => {
    return (dispatch, getState) => {
        let state = getState()
        let initApp = initAppSelector(state)
        if(initApp) {
            return
        } else {
            let changeData
            try {
                changeData = JSON.parse(localStorage.getItem(`${APP_NAME}-auth-user`))

                if (!Array.isArray(changeData)){
                    changeData = []
                }

            } catch (e) {
                changeData = []
            }

            dispatch(saveAuthUser(changeData))

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    let messages = getMockMessagesFromLocale(mockLocale)
                    resolve({
                        locale : mockLocale,
                        messages : messages
                    })
                }, 1000)
            })
                .then(response => {
                    let {locale, messages} = response
                    let intlLocale = require(`react-intl/locale-data/${locale}`)
                    addLocaleData(intlLocale)
                    dispatch(setTrLocale(locale))
                    dispatch(setTrMessages(messages))
                })
                .catch(er => {
                    console.warn(er)
                })
                .finally(() => {
                    dispatch(setAppInitedState(true))
                })

            /*fetch("/api/locale")
                .then(response => {
                    if (response.status >= 400) throw new Error(response.statusText)
                    return response.json()
                })
                .then(response => {
                    let {locale, messages} = response
                    dispatch(setTrLocale(locale))
                    dispatch(setTrMessages(messages))
                })
                .catch(er => {
                    console.warn(er)
                })
                .finally(() => {
                    dispatch(setAppInitedState(true))
                })*/
        }
    }
}