import { Component } from "react";
import Error from '../error/Error'


class ErrorBoundaries extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }
    render() {
        if (this.state.error) {
            return <Error></Error>
        }

        return this.props.children
    }
}


export default ErrorBoundaries;

