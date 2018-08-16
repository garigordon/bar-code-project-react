import {combineReducers} from 'redux'
import authUser, {moduleName as authUserModuleName} from "./moduls/authUser"
import appReducer, {moduleName as appModuleName} from "./moduls/app"
import scannerReducer, {moduleName as scannerModuleName} from "./moduls/scanner"
import {routerReducer as router} from 'react-router-redux'

const reducer = combineReducers({
    [authUserModuleName] : authUser,
    [appModuleName] : appReducer,
    [scannerModuleName] : scannerReducer,
    router,
})


export default reducer