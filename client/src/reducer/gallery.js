import { HE_TV_GENERS, HE_TV, HE_MOVIE, EN_TV, EN_MOVIE, HE_MOVIE_GENERS, EN_TV_GENERS, EN_MOVIE_GENERS } from '../utitlies/Varubale'

const initialzeState = {
    geners: [],
    search: {
        MAIN_ID: null,
        SEARCHES: [
            {
                IMAGE_ID: null,
                ROW_ID: null,
                TOGGLE: false,
                DETAILS: null,
                LOADER: true,
                PROVIDER: [],
                FLAGS: [],
                TRAILER: null,
                LOADING_TRAILER: true,
            }]
    }
}

const galleryReducer = (state = initialzeState, action) => {
    switch (action.type) {

        case 'ADD_GENERS_FIND':
            const newArray = action.payload.filter(x => x.toggle === true)
            const finalArray = []
            newArray.forEach(item => {
                finalArray.push(item.genere)
            })

            return { ...state, geners: finalArray };

        case 'ADD_GENERS':

            const page = action.payload.page;
            const type = action.payload.type;
            const languagh = action.payload.languagh;

            if (languagh === 'il') {
                if (type === "tv") {
                    state.geners = page === 'Explore' ? HE_TV : HE_TV_GENERS
                } else if (type === "movie") {
                    state.geners = page === 'Explore' ? HE_MOVIE : HE_MOVIE_GENERS
                }
            } else if (languagh === 'us') {
                if (type === "tv") {
                    state.geners = page === 'Explore' ? EN_TV : EN_TV_GENERS
                } else if (type === "movie") {
                    state.geners = page === 'Explore' ? EN_MOVIE : EN_MOVIE_GENERS
                }
            }
            return { ...state };

        case 'OPEN_DETAIL':

            let arr;

            const mainId = action.payload.id;
            const row_id = action.payload.indexRow >= 0 ? action.payload.indexRow : 0;
            const image_id = action.payload.index;
            const details = action.payload.details;
            const movieId = action.payload.movieID;
            let indexMovieExist;
            //check if the movie exist 
            state.search.SEARCHES.forEach((movie, i) => {
                if (movie.MOVIE_ID === movieId) {
                    indexMovieExist = i;
                }
            })
            // console.log('movie exist =>', indexMovieExist);

            if (state.search.MAIN_ID === mainId) {
                const indexFind = state.search.SEARCHES.findIndex(x => x.ROW_ID === row_id);

                // console.log('samed main id ==>')
                if (indexFind !== -1) {
                    // console.log('samed row id ==>')

                    if (state.search.SEARCHES[indexFind].IMAGE_ID === image_id) {
                        // console.log('samed image id ==>')

                        if (indexFind === 0 && state.search.SEARCHES.length === 1) {

                            state.search.SEARCHES[0].TOGGLE = false;
                            arr = {
                                MAIN_ID: mainId,
                                SEARCHES: []
                            }
                        }
                    } else {
                        let newArray;
                        if (indexFind === 0) {

                            const TEMP = [...state.search.SEARCHES]
                            TEMP.forEach(item => {
                                item.TOGGLE = false;
                                item.LOADER = false;
                            })
                            const filter = TEMP.filter(x => x.ROW_ID !== 0);
                            newArray = [
                                {
                                    IMAGE_ID: image_id,
                                    ROW_ID: 0,
                                    TOGGLE: true,
                                    DETAILS: details,
                                    LOADER: true,
                                    MOVIE_ID: movieId,
                                    PROVIDER: [],
                                    FLAGS: [],
                                    TRAILER: null,
                                    LOADING_TRAILER: true,

                                }
                                ,
                                ...filter
                            ]
                        } else {
                            state.search.SEARCHES.forEach(item => {
                                item.TOGGLE = false;
                                item.LOADER = false;

                            })
                            newArray = [
                                ...state.search.SEARCHES,
                                {
                                    IMAGE_ID: image_id,
                                    ROW_ID: state.search.SEARCHES.length,
                                    TOGGLE: true,
                                    DETAILS: details,
                                    LOADER: true,
                                    MOVIE_ID: movieId,
                                    PROVIDER: [],
                                    FLAGS: [],
                                    TRAILER: null,
                                    LOADING_TRAILER: true,
                                }
                            ]
                        }
                        arr = {
                            MAIN_ID: mainId,
                            SEARCHES: newArray

                        }
                    }
                } else {

                    if (indexMovieExist >= 0) {

                        state.search.SEARCHES.forEach(item => {
                            item.TOGGLE = false;
                        })
                        state.search.SEARCHES[indexMovieExist].TOGGLE = true;
                        state.search.SEARCHES[indexMovieExist].LOADING_TRAILER = true;

                        arr = {
                            MAIN_ID: mainId,
                            SEARCHES: state.search.SEARCHES
                        }
                    } else {


                        state.search.SEARCHES.forEach(item => {
                            item.TOGGLE = false;
                        })

                        const newArray = [
                            ...state.search.SEARCHES,
                            {
                                IMAGE_ID: image_id,
                                ROW_ID: state.search.SEARCHES.length,
                                TOGGLE: true,
                                DETAILS: details,
                                LOADER: true,
                                MOVIE_ID: movieId,
                                PROVIDER: [],
                                FLAGS: [],
                                TRAILER: null,
                                LOADING_TRAILER: true,
                            }
                        ]

                        arr = {
                            MAIN_ID: mainId,
                            SEARCHES: newArray
                        }
                    }
                }

            } else {
                const newArray = [{
                    IMAGE_ID: image_id,
                    ROW_ID: 0,
                    TOGGLE: true,
                    DETAILS: details,
                    LOADER: true,
                    MOVIE_ID: movieId,
                    PROVIDER: [],
                    FLAGS: [],
                    TRAILER: null,
                    LOADING_TRAILER: true,
                }]
                arr = {
                    MAIN_ID: mainId,
                    SEARCHES: newArray
                }
            }

            return { ...state, search: arr };

        case 'OPEN_TITLE':

            const ID = action.payload.id;
            const indexRow = action.payload.indexRow;
            const tempArr = [...state.search.SEARCHES]
            const index = tempArr.findIndex(x => x.ROW_ID === indexRow);
            let arr_2;
            if (index !== -1) {
                tempArr.forEach(item => {
                    item.TOGGLE = false;
                })
                tempArr[index].TOGGLE = true;
                tempArr[index].LOADING_TRAILER = true;

                arr_2 = {
                    MAIN_ID: ID,
                    SEARCHES: tempArr
                }
            }
            return { ...state, search: arr_2 };

        case 'RESET':
            return {
                geners: [],
                search: {
                    MAIN_ID: null,
                    SEARCHES: [
                        {
                            IMAGE_ID: null,
                            ROW_ID: null,
                            TOGGLE: false,
                            DETAILS: null,
                            LOADER: true,
                            PROVIDER: [],
                            FLAGS: [],
                            TRAILER: null,
                            LOADING_TRAILER: true

                        }]
                }
            };

        case 'ADD_PROVIDERS':
            let arrr;
            const tempArrayProvider = [...state.search.SEARCHES]
            const findIndex = tempArrayProvider.findIndex(x => x.MOVIE_ID === action.payload.movieid);
            if (findIndex !== -1) {
                tempArrayProvider[findIndex].PROVIDER = action.payload.data
            }

            const newArray_3 = [
                ...tempArrayProvider
            ]
            arrr = {
                MAIN_ID: state.search.MAIN_ID,
                SEARCHES: newArray_3
            }
            return { ...state, search: arrr };

        case 'ADD_FLAGS':
            let ARR_FLAGS;
            const tempArrFlags = [...state.search.SEARCHES]
            const findIndexFlags = tempArrFlags.findIndex(x => x.MOVIE_ID === action.payload.movieid);
            if (findIndexFlags !== -1) {
                tempArrFlags[findIndexFlags].FLAGS = action.payload.data
                const checkIfNetflix = tempArrFlags[findIndexFlags].PROVIDER.findIndex(x => x === 'netflix');
                if (checkIfNetflix === -1) {
                    tempArrFlags[findIndexFlags].PROVIDER = [...tempArrFlags[findIndexFlags].PROVIDER, 'netflix']
                }
            }

            const newArrayFlag = [
                ...tempArrFlags
            ]

            ARR_FLAGS = {
                MAIN_ID: state.search.MAIN_ID,
                SEARCHES: newArrayFlag
            }
            return { ...state, search: ARR_FLAGS };

        case 'ADD_TRAILER':
            let arrTrailer
            const tempArrayTrailer = [...state.search.SEARCHES]
            const findIndexTrailer = tempArrayTrailer.findIndex(x => x.MOVIE_ID === action.payload.id);

            if (findIndexTrailer !== -1) {
                tempArrayTrailer[findIndexTrailer].TRAILER = action.payload.src
            }

            const newArray_4 = [
                ...tempArrayTrailer
            ]

            arrTrailer = {
                MAIN_ID: state.search.MAIN_ID,
                SEARCHES: newArray_4
            }

            return { ...state, search: arrTrailer };

        case 'LOADING_CLOSE':
            let arrLoading
            const tempArrayLoading = [...state.search.SEARCHES]
            const findIndexLoading = tempArrayLoading.findIndex(x => x.MOVIE_ID === action.payload.id);
            if (findIndexLoading !== -1) {
                tempArrayLoading[findIndexLoading].LOADING_TRAILER = false
            }
            const newArray_5 = [
                ...tempArrayLoading
            ]
            arrLoading = {
                MAIN_ID: state.search.MAIN_ID,
                SEARCHES: newArray_5
            }
            return { ...state, search: arrLoading };

        case 'NEW_OPEN':
            let arrAddLoading
            const tempArrayAddLoading = [...state.search.SEARCHES]
            const findAddndexLoading = tempArrayAddLoading.findIndex(x => x.MOVIE_ID === action.payload.id);
            if (findAddndexLoading !== -1) {
                tempArrayAddLoading[findAddndexLoading].LOADING_TRAILER = true
            }
            const newArray_6 = [
                ...tempArrayAddLoading
            ]
            arrAddLoading = {
                MAIN_ID: state.search.MAIN_ID,
                SEARCHES: newArray_6
            }
            return { ...state, search: arrAddLoading };

        default:
            return state
    }

}

export default galleryReducer;