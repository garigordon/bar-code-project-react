import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import Result from './Result'
import Scanner from './Scanner'
import LoginPage from './LoginUser/LoginPage'
import {
    initAppSelector,
    checkAndInitApp,
    trLocaleSelector,
    trLocaleMessagesSelector
} from '../redux/moduls/app'
import AuthRoute from './AuthRoute'
import {IntlProvider} from 'react-intl'


class App extends Component {
    render() {
        const {appIsInited, locale, messages} = this.props
        if (!appIsInited) return <div className="wrapper"><h1>Loading...</h1></div>

        return (
            <IntlProvider
                locale = {locale}
                messages = {messages}
            >
                <div className="wrapper">
                    <Switch>
                        <Redirect from="/" exact to="/scanner" />
                        <AuthRoute path="/scanner" component={Scanner} />
                        <AuthRoute path="/result" component={Result} />
                        <Route path="/login" component={LoginPage} />
                        <Route path = '*' component = {NotFoundPage} />
                    </Switch>
                </div>
            </IntlProvider>
        )
    }
    componentDidMount() {
        const {checkAndInitApp} = this.props
        checkAndInitApp()
    }
}


let mapStateToProps = (state, ownProps) => {
    return {
        appIsInited : initAppSelector(state),
        locale : trLocaleSelector(state),
        messages : trLocaleMessagesSelector(state),
    }
}

let mapDispatchToProps = {
    checkAndInitApp,
}

let decorator = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})
let connectedApp = decorator(App)

export default connectedApp