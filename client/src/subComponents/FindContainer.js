import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE, TOGGLE_PICKER, ACTIVE_PICKER, TOGGLE_SEARCH, SUBMIT, ADD_DATA } from '../actions/pickerAction'
import { ADD_GENERS_FIND } from '../actions/galleryAction'
import { COUNTRIES } from '../utitlies/Varubale'
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import { PAGE_FIND } from '../utitlies/Varubale'

function FindContainer(props) {
    const dispatch = useDispatch();
    const picker = useSelector(state => state.PICKER)
    const global = useSelector(state => state.GLOBAL)

    useEffect(() => {
        dispatch(ADD_DATA({ data: PAGE_FIND, languagh: global.language, type: global.type }))
    }, [])

    return (
        <div style={styles.container} className="stickyFind">
            <div style={{ ...styles.rowTitle, backgroundColor: picker.toggle ? '' : 'red' }}>
                <h1 style={{ ...styles.mainTitle, color: picker.toggle ? 'white' : 'black' }}>{picker.search.data.titlecontainer.a}</h1>
                {picker.toggle ?
                    <AiFillCaretUp color={'white'} style={styles.icon} onClick={() => {
                        dispatch(TOGGLE(picker.toggle))
                    }} />
                    :
                    <AiFillCaretDown color={'black'} style={styles.icon} onClick={() => {
                        dispatch(TOGGLE(picker.toggle))
                    }} />

                }
            </div>
            {picker.toggle &&
                <>
                    <div style={styles.searchContainer}>
                        <h2 style={styles.genersTitle} onClick={() => {
                            dispatch(TOGGLE_PICKER(picker.tabs.toggle))
                        }

                        }>{picker.search.data.title_geners}</h2>
                        <div style={{ ...styles.containerPickers, display: picker.tabs.toggle ? 'flex' : 'none', maxWidth: global.mobile ? '90%' : '60%' }}>
                            {picker.tabs.data.map((item, i) => {

                                return <span key={i}
                                    style={{
                                        ...styles.picker,
                                        backgroundColor: item.toggle === true ? 'red' : '',
                                        borderColor: item.toggle ? 'red' : 'white',
                                    }}
                                    className="picker"
                                    onClick={() => {
                                        dispatch(ACTIVE_PICKER({ data: item.toggle, index: i }))
                                    }}
                                >
                                    {item.genere[1]}
                                </span>
                            }

                            )}

                        </div>
                    </div>

                    <div style={styles.searchContainer}>
                        <h2 style={styles.genersTitle} onClick={() => {
                            dispatch(TOGGLE_SEARCH(picker.search.toggle))
                        }

                        }>{picker.search.data.sort}</h2>
                        <div style={{ ...styles.containerPickers, display: picker.search.toggle ? 'flex' : 'none' }}>
                            {picker.data.map((picker, i) => {
                                return <div key={i} style={{ ...styles.serachPicker, maxWidth: global.mobile ? '30%' : null }}>
                                    <label style={styles.label}>{picker[0]}</label>
                                    {i === 2
                                        ?
                                        <select style={styles.input} defaultValue={picker[1]}
                                            ref={props.refs[i]}
                                        >
                                            {
                                                COUNTRIES.map((country, j) => {
                                                    return <option key={j} value={country[0]}>{country[1]}</option>
                                                })
                                            }
                                        </select>
                                        :
                                        <input style={styles.input} placeholder={picker[1]} defaultValue={picker[1]}
                                            ref={props.refs[i]}
                                        />
                                    }
                                </div>
                            })}
                        </div>
                    </div>
                    <button
                        style={styles.button}
                        onClick={() => {
                            dispatch(SUBMIT())
                            dispatch(ADD_GENERS_FIND(picker.tabs.data));
                        }}>
                        {picker.search.data.button}
                    </button>
                </>
            }
        </div>

    )
}

const styles = {
    mainTitle: {
        color: 'red'
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50
    },
    icon: {
        position: 'absolute',
        selfAlign: 'flex-end',
        left: 20,
        fontSize: 20,
        cursor: 'pointer'
    },
    container: {
        // maxHeight: '300px',
        // display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        zIndex: 100000,
        backgroundColor: 'rgba(7,7,7,1)',
        paddingTop: 2,
        paddingBottom: 20


    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        // width: '100%',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'rgba(7,7,7,1)',

    },
    genersTitle: {
        color: 'white',
        cursor: 'pointer',
        width: '100%',
        // paddingTop: 2,
        // paddingBottom: 2,
        boxShadow: '0px 0px 16px 3px black',
        backgroundColor: 'red',
        height: '100%',
        fontSize: '14px',
        margin: 0,
        paddingBottom: 10,
        paddingTop: 10,
    },
    containerPickers: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: 60,
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20,

    },
    picker: {
        height: 20,
        borderStyle: 'solid',
        // fontWeight: 'bold',
        color: 'white',
        // fontSize: 14,
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        margin: 5,
        cursor: 'pointer',
        borderWidth: 2,


    },
    serachPicker: {
        marginLeft: 5,
        marginRight: 5
    },
    label: {
        color: 'white',
        marginRight: 5,
    },
    input: {
        width: 100,
        maxWidth: 100,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0)',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
        outline: 'none',
        color: 'white',
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3
    },
    button: {
        borderRadius: 25,
        width: 100,
        marginTop: 15,
        backgroundColor: 'red',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderStyle: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    }

}
export default FindContainer
