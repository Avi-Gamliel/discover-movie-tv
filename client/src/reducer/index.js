import galleryReducer from './gallery'
import pickerReducer from './picker'
import globalReducer from './global'
import { combineReducers } from 'redux'

const allReducer = combineReducers({
    GALEERY: galleryReducer,
    PICKER: pickerReducer,
    GLOBAL: globalReducer
});

export default allReducer;