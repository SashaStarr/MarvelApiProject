import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { Component } from 'react';

class CharInfo extends Component {

    state = {
        char: null,
        loaded: false,
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
        const { selectCharId } = this.props;
        if (!selectCharId) {
            return
        }
        this.onLoadingAfter();
        this.marvelService.getCharacter(selectCharId).then(this.onCharLoaded).catch(this.onError)
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectCharId !== prevProps.selectCharId) {
            this.updateChar()
        }
    }

    render() {
        const { char, loaded, error } = this.state

        const skeleton = char || loaded || error ? null : <Skeleton />
        const errorMessage = error ? <Error /> : null
        const loading = loaded ? <Spinner /> : null
        const content = !(loaded || error || !char) ? <View char={char} /> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {loading}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;