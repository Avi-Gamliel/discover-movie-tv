import React from 'react'
import OptionFlag from './OptionFlag'
import { CHANGE_TABS, ADD_INPUT } from '../actions/globalAction'
import { useDispatch, useSelector } from 'react-redux'
import { RESET } from '../actions/galleryAction'
import { ADD_DATA } from '../actions/pickerAction'
import { PAGE_FIND } from '../utitlies/Varubale'

function TopBar(props) {
    const dispatch = useDispatch()
    const global = useSelector(state => state.GLOBAL)
    const tabs = [global.tabs.movie, global.tabs.tv]

    const changeType = (i) => {

        if (tabs[i] !== global.tabsWithLanguage) {
            dispatch(CHANGE_TABS())
            dispatch(ADD_INPUT(''));
            props.setInput('')
            props.setFinalInput(false)
            dispatch(RESET())
            dispatch(ADD_DATA({ data: PAGE_FIND, languagh: global.language, type: global.type }))
        }

    }
    const Styles = (mobile, page, checkType, type) => {
        return {
            tabs: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30px',
                backgroundColor: checkType === type ? 'red' : 'black',
                width: props.Device ? 60 : 100,
                borderTopRightRadius: mobile ? 15 : 25,
                borderTopLeftRadius: mobile ? 15 : 25
            },
            textTab: {
                color: 'white',
                fontSize: mobile ? 12 : 16,
                cursor: 'pointer',
                fontWeight: 'bold'
            },
            flag: {
                position: 'absolute',
                zIndex: 100,
                right: mobile ? 5 : 20,
                bottom: 5,
                cursor: 'pointer',
            }
        }
    }
    return (

        <div style={styles.containerMain} className="sticky" >

            <div style={styles.container}>
                {tabs.map((type, i) => {
                    return <div key={i}
                        style={Styles(global.mobile, '', global.tabsWithLanguage, type).tabs}
                        onClick={() => changeType(i)}
                    >
                        <span style={Styles(global.mobile).textTab}>{type}</span>
                    </div>
                })}
            </div>
            <div style={Styles(global.mobile).flag}>
                <OptionFlag
                // changeFlags={props.changeFlags}
                //  flag={props.flags}
                />
            </div>
        </div>

    )
}
const styles = {

    containerMain: {
        width: '100%',
        top: 40,
        zIndex: 100006,
        backgroundColor: 'rgba(18,18,18,1)',
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        alignItems: 'flex-end',
        paddingTop: 20
    },

    container: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        zIndex: 100,
        backgroundColor: 'rgba(18,18,18,1)'
    }

}
export default TopBar
