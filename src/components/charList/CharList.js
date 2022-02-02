import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import PropTypes from 'prop-types';
import { Component } from 'react';

class CharList extends Component {
    state = {
        chars: [],
        loaded: true,
        error: false,
        newItemLoaded: false,
        offset: 210
    }


    marvelService = new MarvelService()

    onLoaded = (newCharsList) => {
        this.setState(({ chars, offset }) => ({
            chars: [...chars, ...newCharsList],
            loaded: false,
            newItemLoaded: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loaded: false
        })
    }

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onListLoaded();
        this.marvelService.getAllCharacters(offset)
            .then(this.onLoaded).catch(this.onError)
    }
    onListLoaded = () => {
        this.setState({
            newItemLoaded: true
        })
    }

    renderItems(arr) {
        const allChars = arr.map(char => {
            return (<li className="char__item" key={char.id} onClick={() => this.props.onChangeChar(char.id)}>
                <img src={char.thumbnail} alt="char"
                    style={char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                        ? { objectFit: 'contain' } : null} />
                <div className="char__name">{char.name}</div>
            </li>)
        })
        return allChars;
    }

    render() {
        const { chars, loaded, error, newItemLoaded, offset } = this.state
        const errorMessage = error ? <Error /> : null
        const loading = loaded ? <Spinner /> : null
        const charsList = this.renderItems(chars)
        const content = !(loaded || error) ? charsList : null
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {loading}
                    {content}
                </ul>
                <button className="button button__main button__long" disable={`${newItemLoaded}`}
                    onClick={() => { this.onRequest(offset) }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onChangeChar: PropTypes.func,
}


export default CharList;