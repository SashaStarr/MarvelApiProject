import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class RandomChar extends Component {

    state = {
        char: {},
        loaded: true,
        error: false
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState({
            char,
            loaded: false
        })
    }

    onError = () => {
        this.setState({
            loaded: false,
            error: true
        })
    }

    onLoadingAfter = () => {
        this.setState({
            loaded: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.onLoadingAfter();
        this.marvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError)
    }


    componentDidMount() {
        this.updateChar();
    }

    componentWillUnmount() {
    }

    render() {
        const { char, loaded, error } = this.state

        const errorMessage = error ? <Error /> : null
        const loading = loaded ? <Spinner /> : null
        const content = !(loaded || error) ? <View char={char} /> : null
        return (
            <div className="randomchar">
                {errorMessage}
                {loading}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar} >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}


const View = ({ char }) => {
    const { name, discription, thumbnail, homepage, wiki } = char
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"
                style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                    ? { objectFit: 'contain' } : null} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {discription}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default RandomChar;