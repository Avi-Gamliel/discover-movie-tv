import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ADD_INPUT } from '../actions/globalAction'
import { RESET } from '../actions/galleryAction'


function SearchPageBanner(props) {
    const dispatch = useDispatch()
    const [valueInput, setInput] = useState('')
    const global = useSelector(state => state.GLOBAL)
    const history = useHistory()

    const submitForm = (e) => {
        e.preventDefault()
        if (global.searchInput !== valueInput) {
            dispatch(ADD_INPUT(valueInput));
            dispatch(RESET());

            props.setFinalInput(false)
            props.setInput(valueInput)
            history.push('/search')
        }

    }

    return (
        <>
            <div style={styles.conatiner} className="sticky">
                <div style={styles.containerForm}>
                    <form onSubmit={(e) => submitForm(e)}>
                        <button type="submit" style={styles.searchBtn}>{global.searchInputPage[1][0]}</button>
                        <input className='input' type="text" placeholder={global.searchInputPage[1][1]} style={styles.input} onChange={e => setInput(e.target.value)} value={valueInput} />
                    </form>
                </div>
            </div>
        </>

    )
}
const styles = {
    conatiner: {
        zIndex: 50000,
        top: 0,
        width: '100%',
        height: 30,
        paddingTop: 10,
        right: 40,
        backgroundColor: 'rgba(18,18,18,1)',
        position: 'absoulte'

    },
    searchBtn: {
        borderColor: 'red',
        borderRadius: 25,
        borderStyle: 'solid',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'red',
        color: 'white',
        borderWidth: 2,
        cursor: 'pointer',

    },
    containerForm: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    input: {
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'white',
        borderWidth: 2,
        marginLeft: 10,
        outline: 'none',
        color: 'white',
        borderStyle: 'solid',
        textAlign: 'left'
    },
    containerResult: {
        position: 'absolute',
        top: 90,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 9000,
        width: '100%',
        height: '100%'
    },
    exit: {
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 14,
        color: 'white',
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        paddingLeft: 10,
        paddingTop: 10,
        cursor: 'pointer',
        zIndex: 3000000
        // left: 0
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }

}
export default SearchPageBanner
