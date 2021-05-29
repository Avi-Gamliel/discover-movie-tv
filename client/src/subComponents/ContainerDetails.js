import React, { useState, useEffect, useRef } from 'react'
import { FIND_LANGUAGE, FIND_GENERE } from '../globalFunction'
import Trailer from './Trailer'
import ContainerPoster from './ContainerPoster'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { FLAGS_CDDE } from '../utitlies/Varubale'
import { ADD_PROVIDERS, OPEN_TITLE, ADD_FLAGS } from '../actions/galleryAction'
import FlagIconFactory from 'react-flag-icon-css';
import { FetchMovie } from '../globalFunction'
import '../Components/styles/providers.css'
const sokcetRef = io.connect('/')
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

function clearTitles(title) {
    var trim = title.trim();
    var lowercase = trim.toLowerCase();
    var removeSpace = lowercase.split(" ");
    var joinspace = removeSpace.join("");
    var clearSpecialCharctor = joinspace.replace(/[^a-zA-Z ]/g, "");
    return clearSpecialCharctor;
}


function ContainerDetails(props) {
    const FlagIcon = FlagIconFactory(React, { useCssModules: false })

    const dispatch = useDispatch();
    const srcRef = useRef()
    const GallLery = useSelector(state => state.GALEERY)
    const global = useSelector(state => state.GLOBAL)

    const [showMore, toggleShowMore] = useState(false);
    const [trailerActive, setTrailerActive] = useState(true)
    const MOVIE_DETAILS = props.detailMovie.DETAILS;
    const Language = FIND_LANGUAGE(MOVIE_DETAILS.original_language, props.languagh);
    const Genere = FIND_GENERE(MOVIE_DETAILS.genre_ids, props.languagh);
    const array = MOVIE_DETAILS.overview.split(" ")
    const searchObject = GallLery.search.SEARCHES[0]
    // const [provider, setProvider] = useState([])
    let date, title;
    if (global.type === 'tv') {
        date = MOVIE_DETAILS.first_air_date.split('-')[0];
        title = MOVIE_DETAILS.name;
    } else if (global.type === 'movie') {
        date = MOVIE_DETAILS.release_date.split('-')[0];
        title = MOVIE_DETAILS.title;
    }
    useEffect(() => {
        setTrailerActive(true)
    }, [])
    useEffect(() => {
        let isMount = true;
        if (isMount) {

            let nameMovie, join, TITLE, joinwithspace;

            sokcetRef.on('updateProvider', ((data, movieid) => {
                dispatch(ADD_PROVIDERS({ data, movieid }))
            }));

            sokcetRef.on('updateFlag', ((data, movieid) => {
                const newArray = [];
                if (data) {
                    data.forEach(c => {
                        const i = FLAGS_CDDE.findIndex(x => x.name === c)
                        if (i !== -1) {
                            newArray.push(FLAGS_CDDE[i].code.toLowerCase())
                        }
                    })
                    dispatch(ADD_FLAGS({ data: newArray, movieid }))
                }
            }));

            sokcetRef.on('updateProviderTv', (async (data, movieid) => {
                dispatch(ADD_PROVIDERS({ data, movieid }))
            }));

            const index = GallLery.search.SEARCHES.findIndex(x => x.MOVIE_ID === MOVIE_DETAILS.id)
            srcRef.current = index

            if (index !== -1) {
                const length = GallLery.search.SEARCHES[index].PROVIDER.length;
                if (global.type === 'movie') {
                    const path = `/movie/${MOVIE_DETAILS.id}`;
                    const data = FetchMovie(path);
                    let Title;
                    data.then(res => {
                        Title = res.title;
                        if (length < 1) {
                            nameMovie = MOVIE_DETAILS.original_title;
                            TITLE = Title.split(" ");
                            TITLE.forEach(title => {
                                title = clearTitles(title);
                            });
                            join = TITLE.join("-");
                            joinwithspace = TITLE.join(" ");
                            sokcetRef.emit("getProvider", join, MOVIE_DETAILS.id, date, nameMovie);
                            sokcetRef.emit("getRegion", joinwithspace, MOVIE_DETAILS.id, date, nameMovie, 'movie');
                        }
                    })

                } else if (global.type === 'tv') {
                    const path = `/tv/${MOVIE_DETAILS.id}`;
                    const data = FetchMovie(path);
                    let Title;
                    data.then(res => {
                        Title = res.name;
                        if (length < 1) {
                            nameMovie = MOVIE_DETAILS.original_name;
                            TITLE = Title.split(" ");
                            TITLE.forEach(title => {
                                title = clearTitles(title);
                            });
                            join = TITLE.join("-");
                            joinwithspace = TITLE.join(" ");
                            sokcetRef.emit("getProviderTv", join, MOVIE_DETAILS.id, date);
                            sokcetRef.emit("getRegion", joinwithspace, MOVIE_DETAILS.id, date, nameMovie, 'tv');

                        }
                    });
                }
            }
        }

        return () => {
            isMount = false
        }
    }, [searchObject])

    const spliceText = array.splice(0, 10).join(" ");

    const activeTrailer = () => {
        setTrailerActive(false)
    }

    const ShowMore = () => {
        toggleShowMore(prev => !prev)
    }

    return (

        <div style={{
            ...styles.containerDetails,
            paddingTop: props.detailMovie.TOGGLE ? 20 : 0,
            paddingBottom: props.detailMovie.TOGGLE ? 20 : 0,
        }}
        >
            <h1
                onClick={() => {
                    dispatch(OPEN_TITLE({ id: props.id, indexRow: props.index }))
                }}
                id={MOVIE_DETAILS.id}
                style={{
                    ...styles.titleMovie,
                    fontSize: global.mobile ? 18 : null,
                    backgroundColor: props.detailMovie.TOGGLE ? '' : 'red',
                    color: props.detailMovie.TOGGLE ? 'red' : 'black',
                    boxShadow: '0px 0px 13px 3px black'
                }}>
                {title}
            </h1>

            {props.detailMovie.TOGGLE ?

                <>
                    <div style={styles.LangAndYear}>{
                        `${date} / ${Language}`
                    }
                    </div>
                    <div style={styles.genres}>{
                        Genere.map((genre, i) => {
                            return <span key={i} style={styles.genre}>{genre}</span>
                        })
                    }
                    </div>
                    {MOVIE_DETAILS.overview &&
                        <div style={{ ...styles.description, maxWidth: global.mobile ? '80%' : '50%' }}>

                            {showMore ?
                                <div style={{ fontSize: global.mobile ? 10 : null }}>
                                    {MOVIE_DETAILS.overview}
                                    <span style={{ ...styles.showMore, fontSize: global.mobile ? 10 : null }} onClick={ShowMore}>
                                        {props.languagh === 'il' ? 'הצג פחות' : 'show less'}
                                    </span>
                                </div>
                                :
                                <div style={{ fontSize: global.mobile ? 10 : null }}>{spliceText} <span style={styles.showMore} onClick={ShowMore}>{props.languagh === 'il' ? 'הצג עוד' : 'show more'}</span></div>
                            }
                        </div>
                    }
                    {props.detailMovie.PROVIDER.length > 1 ?
                        <div style={{ color: 'white', display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {props.detailMovie.PROVIDER.filter((item, i) => i !== 0).map((item, i) => {
                                return <div key={i} style={{ width: 20, height: 20, marginBottom: 10, marginLeft: 5, marginRight: 5, borderStyle: 'solid', borderWidth: 1, borderColor: 'white' }} title={item} className={item}></div>
                            })}
                        </div>
                        :
                        props.detailMovie.PROVIDER.length === 0 ?
                            <span style={{ color: 'red' }}>{global.language === 'il' ? '...מחפש היכן ניתן לצפות' : 'search providers ...'}</span> :

                            props.detailMovie.PROVIDER.length === 1 ?
                                <span style={{ color: 'red' }}>{global.language === 'il' ? 'אין תוצאות' : 'not found'}</span> : null
                    }
                    {props.detailMovie.FLAGS.length > 0 &&
                        <div >
                            <span style={styles.flagTitle}>{global.language === 'il' ? 'ארצות שידור - נטפליקס' : 'netflix countries'}</span>
                            <div style={styles.flags}>
                                {props.detailMovie.FLAGS.map((c, i) => (
                                    <div key={i} style={{ paddingLeft: 3, paddingRight: 3 }}>
                                        <FlagIcon code={c} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {trailerActive ?
                        <>
                            <Trailer
                                src={srcRef.current}
                                languagh={props.languagh}
                                movieId={MOVIE_DETAILS.id}
                                activeTrailer={activeTrailer}
                            />

                            <div id="movies-container" className="pt-3">
                                <ContainerPoster
                                    setLoading={props.setLoading}
                                    key={'similar'}
                                    id={props.id}
                                    index={props.index + 1}
                                    type={[MOVIE_DETAILS.id, "similar"]}
                                    page={'Similar'}
                                    languagh={props.languagh}
                                />
                            </div>

                        </>
                        :
                        <img alt="" src={IMAGE_URL + MOVIE_DETAILS.backdrop_path} />
                    }
                </>
                : null}
        </div>

    )
}

const styles = {

    containerDetails: {
        backgroundColor: 'black',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },

    titleMovie: {

        margin: 0,
        cursor: 'pointer',
        width: '100%'
    },

    LangAndYear: {
        color: 'white',
        marginBottom: 10,
    },

    genres: {
        margin: 0,
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
    },
    genre: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '25px',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marignRight: 5
    },
    description: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,

    },
    showMore: {
        color: 'red',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    flagTitle: {
        color: 'red',
        width: 300,
        margin: 10
    },
    flags: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        marginBottom: 10,
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}

export default ContainerDetails
