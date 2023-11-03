import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {
    
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    onCharLoad = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {return;}
        
        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoad)
            .catch(this.onError)
    }

    render() {

        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error  ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const contain = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {contain}
            </div>
        )
    }
}

export default CharInfo;

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
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
                {comics.length > 0 ? null : 'Комиксы отсутствуют!'}
                {
                    comics.map((item, i) => {
                        if(i > 10) return;
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


// return (
//     <div className="char__info">
//         <div className="char__basics">
//             <img src={thor} alt="abyss"/>
//             <div>
//                 <div className="char__info-name">thor</div>
//                 <div className="char__btns">
//                     <a href="#" className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href="#" className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="char__descr">
//             In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
//         </div>
//         <div className="char__comics">Comics:</div>
//         <ul className="char__comics-list">
//             <li className="char__comics-item">
//                 All-Winners Squad: Band of Heroes (2011) #3
//             </li>
//             <li className="char__comics-item">
//                 Alpha Flight (1983) #50
//             </li>
//             <li className="char__comics-item">
//                 Amazing Spider-Man (1999) #503
//             </li>
//             <li className="char__comics-item">
//                 Amazing Spider-Man (1999) #504
//             </li>
//             <li className="char__comics-item">
//                 AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Vengeance (2011) #4
//             </li>
//             <li className="char__comics-item">
//                 Avengers (1963) #1
//             </li>
//             <li className="char__comics-item">
//                 Avengers (1996) #1
//             </li>
//         </ul>
//     </div>
// )