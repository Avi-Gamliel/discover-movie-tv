import { tabs } from '../utitlies/Varubale'

const initialzeState = {
    page: window.location.pathname.split('/')[1],
    language: 'il',
    flags: true,
    tabs: { movie: tabs.he.movie, tv: tabs.he.tv },
    searchInputPage: [['תוצאות'], ['חפש', 'סרט / סדרה']],
    menu: false,
    type: 'movie',
    tabsWithLanguage: 'סרטים',
    searchInput: '',
    path: window.location.pathname.split('/')[1],
    mobile: window.innerWidth <= 500 ? true : false
}


const pickerReducer = (state = initialzeState, action) => {

    switch (action.type) {

        case 'CHANGE_LANGUAGE':
            return { ...state };

        case 'CHANGE_TABS':
            if (action.payload !== 'search') {

                const newType = state.type === 'movie' ? 'tv' : 'movie'
                state.type = newType
                state.tabsWithLanguage =
                    state.language === 'il' ?
                        newType === 'movie'
                            ?
                            'סרטים'
                            : 'סדרות'
                        :
                        newType === 'movie' ? 'Movies' : 'Tv'
            } else {

            }
            return { ...state }

        case 'CHANGE_MENU':
            state.path = action.payload;
            return { ...state }

        case 'TOGGLE_MENU':
            state.menu = !state.menu
            return { ...state }
        case 'TOGGLE_FLAG':
            state.flags = !state.flags

            return { ...state }

        case 'CHANGE_FLAG':
            state.language = action.payload
            state.tabs = action.payload === 'il'
                ? { movie: tabs.he.movie, tv: tabs.he.tv } : { movie: tabs.us.movie, tv: tabs.us.tv }
            state.tabsWithLanguage =
                action.payload === 'il' ?
                    state.type === 'movie'
                        ?
                        'סרטים'
                        : 'סדרות'
                    :
                    state.type === 'movie' ? 'Movies' : 'Tv'

            state.searchInputPage = action.payload === 'il' ?
                [['תוצאות'], ['חפש', 'סרט / סדרה']] :
                [['search'], ['search', 'movie / tv']]

            state.flags = !state.flags


            return { ...state }

        case 'ADD_INPUT':
            state.searchInput = action.payload;
            return { ...state };
        default:
            return { ...state };
    }
}

export default pickerReducer;