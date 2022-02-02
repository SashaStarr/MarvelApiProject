import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {
    state = {
        selectCharId: null
    }

    onChangeChar = (id) => {
        this.setState({
            selectCharId: id
        })
    }

    render() {
        return (
            <div className="app">
                <ErrorBoundaries>
                    <AppHeader />
                </ErrorBoundaries>
                <main>
                    <ErrorBoundaries>
                        <RandomChar />
                    </ErrorBoundaries>
                    <div className="char__content">
                        <ErrorBoundaries>
                            <CharList onChangeChar={this.onChangeChar} />
                        </ErrorBoundaries>
                        <ErrorBoundaries>
                            <CharInfo selectCharId={this.state.selectCharId} />
                        </ErrorBoundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }

}

export default App;