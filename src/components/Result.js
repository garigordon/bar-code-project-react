import React, {Component} from 'react'
import {connect} from 'react-redux'
import {scannerResultSelector, handleScanResset} from "../redux/moduls/scanner";
import {FormattedMessage} from 'react-intl'

class Result extends Component{
    render(){
        const {result, handleScanResset} = this.props
        return(
            <div className="container">
                <h1>
                    <FormattedMessage
                        id="result"
                        defaultMessage="My result"
                    />
                </h1>
                <p>
                    {
                        result ? result : "No results"
                    }
                </p>
                <button type="button" onClick={handleScanResset}>
                    <FormattedMessage
                        id="reset"
                        defaultMessage="My reset"
                    />
                </button>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        result : scannerResultSelector(state)
    }
}

let mapDispatchToProps = {
    handleScanResset,
}
let decorator = connect(mapStateToProps, mapDispatchToProps)
let connectedResult = decorator(Result)

export default connectedResult