import React, {Component} from 'react'
import {connect} from 'react-redux'
import Instascan from 'instascan'
import {handleScann} from '../../redux/moduls/scanner'
import {FormattedMessage} from 'react-intl'


class Scanner extends Component {
    state = {
        errror : ""
    }
    render() {
        let {errror} = this.state
        return(
            <div className="container">
                <h1>
                    <FormattedMessage
                        id="Scanner"
                        defaultMessage="My scanner"
                    />
                </h1>
                {
                    errror && <p style={{color:"red"}}>{errror}</p>
                }
                <video id="preview" ref={this.getVideoRef} />
            </div>
        )
    }
    componentDidMount(){
        let {handleScann} = this.props
        try {
            let scanner = new Instascan.Scanner({
                video: document.getElementById('preview'),
                scanPeriod: 5
            })
            scanner.addListener('scan', function (content) {
                handleScann(content)
            })
            Instascan.Camera.getCameras()
                .then(function (cameras) {
                    if (cameras.length > 0) {
                        scanner.start(cameras[0])
                    } else {
                        throw new Error('No cameras found.')
                    }
                })
                .catch(function (error) {
                    /*let msg = typeof error === 'object'
                        ? error.message :
                        typeof error === "string" ?
                            error :
                            "something went wrong"
                    this.setState({errror: msg})*/
                })
        } catch (e) {
            console.log(e)
        }
    }

    getVideoRef = ref => this.ref = ref
}

let mapDispatchToProps = {
    handleScann,
}

let decorator = connect(null, mapDispatchToProps)
let connectedScanner = decorator(Scanner)

export default connectedScanner
