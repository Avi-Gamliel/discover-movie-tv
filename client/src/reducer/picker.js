import { HE_TV_GENERS, HE_MOVIE_GENERS, EN_TV_GENERS, EN_MOVIE_GENERS, PAGE_FIND } from '../utitlies/Varubale'


const initialzeState = {

    tabs: {
        toggle: false,
        data: [],
    },
    search: {
        toggle: false,
        data: PAGE_FIND.HE,
    },
    data: [
        [PAGE_FIND.HE.year, '2020', 2020],
        [PAGE_FIND.HE.likes, '0', 0],
        [PAGE_FIND.HE.language, '', 'en']],
    submit: {
        values: [],
        generes: []
    },
    toggle: true
}


const pickerReducer = (state = initialzeState, action) => {

    switch (action.type) {
        case 'ADD_DATA':
            let finalData = [];
            const Language = action.payload.languagh;
            const type = action.payload.type;
            let newData = Language === 'il' ? type === 'tv' ? HE_TV_GENERS : HE_MOVIE_GENERS : type === 'tv' ? EN_TV_GENERS : EN_MOVIE_GENERS;

            newData.forEach(genere => {
                finalData.push({
                    genere,
                    toggle: false
                })
            })


            const languagh = action.payload.languagh;
            const data = action.payload.data;
            state.search.data = languagh === 'il' ? data.HE : data.EN
            state.data[0][0] = state.search.data.year
            state.data[1][0] = state.search.data.likes
            state.data[2][0] = state.search.data.language


            state.tabs.data = finalData;

            return { ...state };
        // case 'ADD_TABS':

        //     let finalData = [];
        //     const Language = action.payload.languagh;
        //     const type = action.payload.type;
        //     let newData = Language === 'il' ? type === 'tv' ? HE_TV_GENERS : HE_MOVIE_GENERS : type === 'tv' ? EN_TV_GENERS : EN_MOVIE_GENERS;

        //     newData.forEach(genere => {
        //         finalData.push({
        //             genere,
        //             toggle: false
        //         })
        //     })

        //     state.tabs.data = finalData;
        //     return { ...state };

        // case 'ADD_SEARCH_DATA':

        //     const languagh = action.payload.languagh;
        //     const data = action.payload.data;
        //     state.search.data = languagh === 'il' ? data.HE : data.EN
        //     state.data[0][0] = state.search.data.year
        //     state.data[1][0] = state.search.data.likes
        //     state.data[2][0] = state.search.data.language
        //     return { ...state };

        case 'ACTIVE_PICKER':

            state.tabs.data[action.payload.index].toggle = action.payload.data ? false : true;
            return { ...state };

        case 'TOGGLE_PICKER':

            state.tabs.toggle = action.payload ? false : true;
            state.search.toggle = false;

            return { ...state };

        case 'TOGGLE_SEARCH':

            state.search.toggle = action.payload ? false : true;
            state.tabs.toggle = false;
            return { ...state };

        case 'SUBMIT':

            state.search.toggle = false;
            state.tabs.toggle = false;
            state.toggle = false;

            return { ...state };

        case 'TOGGLE':

            state.toggle = action.payload ? false : true
            return { ...state };

        default:
            return { ...state };
    }
}

export default pickerReducer;