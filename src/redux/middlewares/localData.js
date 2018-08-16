import {SAVE_AUTH_USER} from '../moduls/authUser'
import {APP_NAME} from '../../settings'


/**
 * for sync data between redux store and localStorage
 * this data is needed to keep between browser reloads
 * */
const localData = store => next => action => {
    if (action.type === SAVE_AUTH_USER){
        localStorage.setItem(`${APP_NAME}-auth-user`, JSON.stringify(action.payload.changeData))
    }
    next(action)
}

export default localData