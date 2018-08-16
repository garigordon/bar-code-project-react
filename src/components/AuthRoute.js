import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {userIsAuthSelector} from "../redux/moduls/authUser"

class AuthRoute extends Component {
    render() {
        let {component, ...rest} = this.props
        return (
            <Route
                {...rest}
                render = {this.routeRender}
            />
        )
    }

    routeRender = innerProps => {
        let {component: Component, isLogin} = this.props
        return isLogin ?
            <Component {...innerProps} /> :
            (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: innerProps.location }
                    }}
                />
            )
    }
}

export default connect(
    state => ({
        isLogin : userIsAuthSelector(state)
    })
)(AuthRoute)