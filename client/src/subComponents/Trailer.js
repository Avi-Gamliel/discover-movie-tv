import React, { useEffect, useRef } from 'react'
import { Fetch } from '../globalFunction'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TRAILER, LOADING_CLOSE } from '../actions/galleryAction'

function Trailer(props) {

    const dispatch = useDispatch()
    const Gallery = useSelector(state => state.GALEERY)
    const global = useSelector(state => state.GLOBAL)
    const index = Gallery.search.SEARCHES.findIndex(x => x.MOVIE_ID === props.movieId)
    const refVideo = useRef()


    useEffect(() => {
        let mount = true;
        if (mount)
            if (refVideo.current) {
                refVideo.current.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                refVideo.current.allowFullscreen = true;
            }
        return () => {
            mount = false
        }
    }, [props.iFrame])


    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            if (Gallery.search.SEARCHES[index].TRAILER === null) {
                const path = `/${global.type}/${props.movieId}/videos`;
                const DATA = Fetch(path, ``, 'movieposter',);
                DATA.then(async (res) => {
                    if (res) {
                        if (res.length !== 0) {
                            if (res.site !== "") {
                                const trailerVideo = await CREATE_VIDEO_MAIN_TRAILER(res)
                                if (trailerVideo) {
                                    if (trailerVideo.key) {
                                        const src = `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&autohide=1&showinfo=0&controls=0&loop=1&&enablejsapi=1 `;

                                        dispatch(ADD_TRAILER({ src, id: props.movieId }))
                                    } else {
                                        props.activeTrailer()
                                    }
                                } else {
                                    props.activeTrailer()
                                }
                            }
                        }
                    } else {
                        props.activeTrailer()
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        return () => {
            isMounted = false
        }


    }, [props.movieId])

    const CREATE_VIDEO_MAIN_TRAILER = async (videos) => {
        for (var i = 0; i < videos.length; i++) {
            let video = videos[i];
            if (video) {
                // console.log('video', video);
                const testUrsl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${video.key}&key=AIzaSyCj8X500qtlKtWP04tgPzaFBvTZ8751CP8`
                const checkRegionLegall = async () => {
                    const CHECK = await (fetch(testUrsl)
                        .then(res => res.json())
                        .then(data => {
                            if (data.items[0].contentDetails.regionRestriction) {
                                const check = data.items[0].contentDetails.regionRestriction.indexOf("IL");
                                if (check === -1 || check === undefined || check === "undefined") {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        })
                        .catch(err => {
                            console.log(16, err)
                            return false
                        }))
                    return CHECK;
                }
                const check = await checkRegionLegall()

                if (check) {
                    return video;
                } else {
                    if (i === videos.length - 1) {
                        return false
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    const handleVideoChange = () => {
        dispatch(LOADING_CLOSE({ id: props.movieId }))
    };

    return (
        <div style={{ width: '100%', height: 300, borderStyle: 'none' }}>

            { Gallery.search.SEARCHES[index].LOADING_TRAILER ?
                <div style={styles.containerLoading}>
                    <div className="loading" style={styles.loading} />
                </div>
                :
                null}
            <div style={{ width: '100%' }}>
                {
                    Gallery.search.SEARCHES[index].TRAILER &&
                    <iframe
                        onLoad={handleVideoChange}
                        title={'trailer'}
                        src={Gallery.search.SEARCHES[props.src].TRAILER}
                        ref={refVideo}
                        style={{ width: '100%', height: 300, borderStyle: 'none' }}
                    ></iframe>
                }
            </div>

        </div>
    )
}
const styles = {

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
        height: 305,
        alignItems: 'center',
        background: 'black',
        width: '100%',
        position: 'absolute',
        color: 'white'
    },

}
export default Trailer
