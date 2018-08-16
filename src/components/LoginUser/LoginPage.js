import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'
import {userIsAuthSelector} from "../../redux/moduls/authUser"

class LoginPage extends Component{

    render() {
        let {isLogin} = this.props
        if(isLogin) return <Redirect to='/' />

        return(
            <div className="container">
                <LoginForm/>
            </div>
        )
    }
}

export default connect(
    state => ({
        isLogin : userIsAuthSelector(state)
    })
)(LoginPage)
