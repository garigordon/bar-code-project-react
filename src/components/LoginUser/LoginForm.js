import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    loginFieldSelector,
    changeLoginField,
    checkAndLoginUser,
    errorFormStateSelector,
    userIsAuthSelector
}from '../../redux/moduls/authUser'
import {intlShape, injectIntl, FormattedMessage} from 'react-intl'


class LoginForm extends Component{
    onChange = (e) => {
        let {changeLoginField} = this.props
        const { name, value } = e.target;
        changeLoginField(name, value)
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {checkAndLoginUser} = this.props
        const { name, value } = e.target
        checkAndLoginUser(name, value)
    }

    render(){
        const {password, email, error, intl} = this.props
        const {formatMessage} = intl
        return(
            <div className="login-page">
                <h2>
                    <FormattedMessage
                        id="Login"
                        defaultMessage="My Login"
                    />
                </h2>
                <form onSubmit={this.onSubmit}>
                    <div className="item">
                        <input
                            name="email"
                            type="text"
                            placeholder={formatMessage({
                                id : 'email',
                                defaultMessage : 'Enter email'
                            })}
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div className="item">
                        <input
                            name="password"
                            type="password"
                            placeholder={formatMessage({
                                id : 'password',
                                defaultMessage : 'Enter password'
                            })}
                            onChange={this.onChange}
                            value={password}
                        />
                    </div>
                    <div className="item">
                        <button className="btn btn-info">
                            <FormattedMessage
                                id="Login"
                                defaultMessage="My Login"
                            />
                        </button>
                    </div>
                    {
                        !!error ? <p>{error}</p> : ""
                    }
                </form>
            </div>
        )
    }

    static propTypes = {
        intl: intlShape.isRequired
    }
}
/*
* LoginForm.propTypes = {
    intl: intlShape.isRequired,
}
* */

const mapStateToProps = state => {
    return {
        email : loginFieldSelector(state, "email"),
        password : loginFieldSelector(state, "password"),
        error : errorFormStateSelector(state),
        authentificated : userIsAuthSelector(state)
    }
}

const mapDispatchToProps = {
    changeLoginField,
    checkAndLoginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm))

