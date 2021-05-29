import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaWpexplorer, FaSearch } from 'react-icons/fa';
import { RiComputerFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'
import { RESET } from '../actions/galleryAction'
import { CHANGE_MENU, TOGGLE_MENU } from '../actions/globalAction'
import { withRouter } from "react-router-dom";

function Menu({ history }) {
    const global = useSelector(state => state.GLOBAL)
    const dispatch = useDispatch()
    const [menuRow, setMenuRow] = useState([])

    const changePath = (ata) => {

        if (window.location.pathname.split('/')[1] !== ata) {
            history.push(`/${ata}`)
            dispatch(RESET());
            setTimeout(() => {
                dispatch(CHANGE_MENU(window.location.pathname.split('/')[1]))
            }, 50);
        }
    }

    useEffect(() => {
        if (global.language === 'il') {
            setMenuRow([['חקור', <FaWpexplorer color={global.path === 'explore' ? 'red' : 'white'} />, 'explore'], ["ז'אנרים", <RiComputerFill color={global.path === 'geners' ? 'red' : 'white'} />, 'geners'], ['חיפוש', <FaSearch color={global.path === 'find' ? 'red' : 'white'} />, 'find']]);
        } else if (global.language === 'us') {
            setMenuRow([['Explore', <FaWpexplorer color={global.path === 'explore' ? 'red' : 'white'} />, 'explore'], ["Geners", <RiComputerFill color={global.path === 'geners' ? 'red' : 'white'} />, 'geners'], ['Find', <FaSearch color={global.path === 'find' ? 'red' : 'white'} />, 'find']]);
        }
    }, [global.language, global.path])

    const toggleMenu = () => {
        dispatch(TOGGLE_MENU())
    }


    return (
        <>
            <div className='gradient' style={{
                ...styles.container,
                position: global.mobile ? 'fixed' : '',
                height: global.mobile ? '100vh' : '',
                left: global.mobile ? global.menu ? 0 : -50 : 0,
                zIndex: 1000000,
                minWidth: global.menu ? '200px' : '50px',
                maxWidth: global.menu ? '200px' : '50px'
            }}>
                <div className="sticky" style={{ ...styles.stickyContiner }}>

                    <div style={{ width: '100%', height: 40, alignItems: 'center', display: 'flex', justifyContent: global.menu ? 'flex-end' : 'center' }}>

                        <GiHamburgerMenu color="white" size={25} style={{
                            ...styles.icon,
                            paddingRight: global.menu ? 10 : '', left: global.mobile ? global.menu ? 0 : 60 : 0,
                            position: global.mobile ? global.menu ? '' : 'absolute' : '',
                            cursor: 'pointer'
                        }} onClick={toggleMenu} />
                    </div>
                    <div style={styles.containerRows} >
                        {global.menu ?
                            menuRow.map((row, i) => (
                                <div key={i}
                                    // to={`/${row[2]}`}
                                    className="menu_tab"

                                    style={{
                                        ...styles.row,
                                        backgroundColor: global.path === row[2] ? 'rgba(0,0,0,0.7)' : '',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer'
                                    }} onClick={() => changePath(row[2])}>
                                    <span style={{ ...styles.textRow, color: global.path === row[2] ? 'red' : 'white' }}>{row[0]}</span>
                                    {row[1]}
                                </div>
                            ))
                            :
                            menuRow.map((row, i) => (
                                <div key={i}
                                    className="menu_tab"

                                    // to={`/${row[2]}`}
                                    style={{

                                        ...styles.row,
                                        color: global.path === row[2] ? 'red' : 'white',
                                        backgroundColor: global.path === row[2] ? 'rgba(0,0,0,0.7)' : '',
                                        justifyContent: 'center',
                                        cursor: 'pointer'

                                    }} onClick={() => changePath(row[2])}>
                                    {row[1]}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const styles = {
    container: {

    },
    stickyContiner: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    row: {
        padding: 10,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

    },
    containerRows: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 60
    },
    textRow: {
        fontWeight: 'bold'
    },
    icons: {
        zIndex: 10002
    }

}
export default withRouter(Menu)
