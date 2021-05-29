import React, { useEffect, useState, useRef } from 'react'
import { Fetch } from '../globalFunction'
import MoviePoster from './MoviePoster'
import io from "socket.io-client";
import { useSelector } from 'react-redux'
// const ENDPOINT = '/';


function imagesLoaded(parentNode) {
    const imgElements = [...parentNode.querySelectorAll("img")];
    for (let i = 0; i < imgElements.length; i += 1) {
        const img = imgElements[i];
        if (!img.complete) {
            return false;
        }

    }
    return true;
}

function ContainerPoster(props) {
    const global = useSelector(state => state.GLOBAL)
    const socketRef = useRef()
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState({ loading: true });
    const galleryElement = useRef()
    useEffect(() => {
        let isMount = true;
        if (isMount) {

            socketRef.current = io.connect('/', {
                transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'polling']
            });
        }
        return () => {
            isMount = false
        }
    }, [])
    useEffect(() => {
        let isMounted = false
        const fetchData = (data) => {
            data.then(res => {
                if (!isMounted) {
                    setItems(res)
                }
            }).catch(err => console.log(err))
        }
        if (props.page === "Explore") {
            const path = `/${global.type}/${props.type[0]}`;
            const sec_path = ``;
            const data = Fetch(path, sec_path, 'Explore', props.languagh);
            fetchData(data)
        } else if (props.page === "Geners") {
            const path = `/discover/${global.type}`;
            const sec_path = `&with_genres=${props.type[0]}`;
            const data = Fetch(path, sec_path, "Geners", props.languagh);
            fetchData(data)
        } else if (props.page === 'search') {
            const path = `/search/${global.type}`;
            const secPath = `&query=${props.type[0]}`
            const data = Fetch(path, secPath, "search", props.languagh);
            fetchData(data)
        } else if (props.page === 'Similar') {
            const path = `/${global.type}/${props.type[0]}/similar`;
            const data = Fetch(path, '', 'similar', props.languagh);
            fetchData(data)
        } else if (props.page === 'Find') {
            const path = `/discover/${global.type}`;
            const secPath = `&with_genres=${props.type[0]}`;
            const data = Fetch(path, secPath, 'find', props.languagh, props.dataFind, global.type);
            fetchData(data)
        }

        return () => {
            isMounted = true
        }

    }, [])

    const handleImageChange = () => {
        setLoading({
            loading: !imagesLoaded(galleryElement.current)
        });
    };

    const Styles = (mobile, page) => {
        return {
            mainTitle: {
                color: 'white',
                fontSize: mobile ? 25 : null
            },
            section: {
                minHeight: mobile ? page === 'Similar' ? 80 : 160 : page === 'Similar' ? 100 : 300,
                zIndex: 8000,

            }
        }
    }

    return (

        <div style={styles.containerMainSection}>
            <div style={styles.containerTitle}>
                <h1 style={Styles(global.mobile).mainTitle}>{props.page === 'search' ? global.searchInputPage[0] : props.type[1]} </h1>
            </div>
            {items.length > 0 ?

                <section className="section search" style={Styles(global.mobile, props.page).search}
                    ref={element => {
                        galleryElement.current = element;
                    }}
                >
                    {loading.loading ?
                        <div style={styles.containerLoading}>
                            <div className="loading" style={styles.loading} />
                        </div>
                        :
                        null}

                    {items.filter(movie => movie.poster_path !== null).map((movie, i) =>
                        <MoviePoster
                            mobile={global.mobile}
                            id={props.id}
                            page={props.page}
                            key={i}
                            movieId={movie.id}
                            index={i}
                            indexRow={props.index}
                            details={movie}
                            type={global.type}
                            languagh={props.languagh}
                            handleImageChange={handleImageChange}
                        />
                    )}

                </section>
                : <span style={{ color: 'red', fontWeight: 'bold' }}>no result</span>
            }
        </div>

    )
}


const styles = {
    containerMainSection: {
        width: '100%',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },

    containerTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    loading: {
        borderWidth: 0,
        width: 50,
        height: 50,
        borderStyle: 'none'
    },
    containerLoading: {
        display: 'flex',
        justifyContent: 'center',
        borderWidth: 0,
        height: 300,
        alignItems: 'center',
        background: 'black',
        width: '100%',
        position: 'absolute',
        color: 'white'
    },

}

export default ContainerPoster
