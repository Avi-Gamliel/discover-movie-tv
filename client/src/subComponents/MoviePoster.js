import React from 'react'
import { FIND_LANGUAGE } from '../globalFunction'
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux'
import { OPEN_DETAIL } from '../actions/galleryAction'

function MoviePoster(props) {
    const dispatch = useDispatch();
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"
    let title, date, year;
    const vote = props.details.vote_count;
    const Language = FIND_LANGUAGE(props.details.original_language, props.languagh);

    if (props.type === "tv") {
        date = props.details.first_air_date;
        title = props.details.name;
    } else if (props.type === "movie") {
        date = props.details.release_date;
        title = props.details.title;
    }

    if (date) {
        year = date.split("-")[0]
    } else {
        year = "0"
    }


    const openDetails = () => {
        dispatch(OPEN_DETAIL({ details: props.details, index: props.index, id: props.id, indexRow: props.indexRow, movieID: props.details.id }))
    }

    return (

        <div style={{ ...styles.containerdetails, maxWidth: props.mobile ? 140 : '180px' }} >
            <div style={styles.containerLikes}>
                <span style={{ ...styles.numLike, color: vote > 2000 ? 'red' : 'white' }}>{vote}</span>
                <AiFillHeart style={{ ...styles.likeIcon, color: vote > 2000 ? 'red' : 'white' }} />
            </div>

            <img
                onLoad={props.handleImageChange}
                onError={props.handleImageChange}
                onClick={() => openDetails()} className='poster_img'
                style={{ height: props.mobile ? (props.page === 'Similar' ? 80 : 140) : (props.page === 'Similar' ? 120 : 180) }}
                alt="" src={IMAGE_URL + props.details.poster_path}
                data-movie-id={props.details.id} />
            <p style={{ ...styles.title }}> {title}</p>
            <p style={styles.year}>{year}</p>
            <p style={styles.title}>{Language}</p>
        </div>
    )
}
const styles = {
    containerdetails: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWarp: 'wrap',
        padding: 3
    },
    containerLikes: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,

    },
    likeIcon: {
        fontSize: 10,
        paddingLeft: 5,
        paddingLRight: 5,

    },
    numLike: {
        fontSize: 10,
        paddingLRight: 5,
    },
    title: {
        margin: 0,
        color: 'white',
        textAlign: 'left',
        fontSize: 12,
        maxWidth: '122px',

    },
    year: {
        margin: 0,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 14,
    },

    langugh: {
        margin: 0,
        color: 'white'
    }
}
export default MoviePoster
