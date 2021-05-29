import React from 'react'
import FlagIconFactory from 'react-flag-icon-css';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_FLAG, CHANGE_FLAG } from '../actions/globalAction'
import { ADD_DATA } from '../actions/pickerAction'
import { PAGE_FIND } from '../utitlies/Varubale'
import { RESET } from '../actions/galleryAction'

function OptionFlag(props) {
    const dispatch = useDispatch()
    const FlagIcon = FlagIconFactory(React, { useCssModules: false })
    const countries = [{ code: 'il' }, { code: 'us' }]
    const global = useSelector(state => state.GLOBAL)
    const ChooseFlag = (index) => {
        dispatch(CHANGE_FLAG(countries[index].code))
        dispatch(RESET());
        dispatch(ADD_DATA({ data: PAGE_FIND, languagh: global.language, type: global.type }))
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, alignItems: 'center', }} >
            <div style={{ marginTop: 2, fontSize: 20, zIndex: 1001 }} onClick={() => dispatch(TOGGLE_FLAG())} >
                <FlagIcon code={global.language} />
            </div>
            {!global.flags
                ?
                <div style={{ position: 'absolute', backgroundColor: 'white', padding: '5px', top: 30 }}>
                    {countries.map((cuntry, i) => {
                        return <div key={i} style={{ marginTop: 2, fontSize: 15, boxShadow: '0px 0px 15px 1px rgba(0,0,0,0.3)' }} onClick={() => ChooseFlag(i)} >
                            <FlagIcon code={cuntry.code} />
                        </div>
                    })}
                </div>
                :
                null
            }
        </div>

    )
}

export default OptionFlag
