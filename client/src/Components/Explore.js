import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_GENERS } from '../actions/galleryAction'
import ContainerPoster from '../subComponents/ContainerPoster'
import ContainerDetails from '../subComponents/ContainerDetails'
import FindContainer from '../subComponents/FindContainer'
import TopBar from '../subComponents/TopBar'
import SearchPageBanner from '../subComponents/SearchPageBanner'
import Menu from '../subComponents/Menu'
function Explore(props) {

    const dispatch = useDispatch();
    const inputYear = useRef();
    const inputLikes = useRef();
    const inputCounty = useRef();
    const GallLery = useSelector(state => state.GALEERY)
    const global = useSelector(state => state.GLOBAL)

    useEffect(() => {
        let isMount = true;
        if (isMount) {
            if (props.page === 'Similar' || props.page === 'Find') {

            } else {
                dispatch(ADD_GENERS({ languagh: global.language, type: global.type, page: props.page }));
            }
        }
        return () => {
            isMount = false
        }

    }, [global.type, global.language, dispatch, props.page])


    return (
        <div className="mainContainer" style={{ width: '100%', display: 'flex', maxHight: '100vh', height: '100vh', flexDirection: 'row' }}>
            <Menu />
            <div className='Container' style={{ minWidth: '80%', maxWidth: '100%', width: '100%', height: '100vh', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(18,18,18,1)' }}>
                <div style={{ maxHeight: '90px' }}>

                    <SearchPageBanner
                        setFinalInput={props.setFinalInput}
                        setInput={props.setInput}
                    />
                    <TopBar
                        setFinalInput={props.setFinalInput}
                        setInput={props.setInput} />
                </div>
                <div className='scrollContainer'
                // style={{ height: '100%', marginTop: 0 }}
                >
                    <div id="boxdata"></div>
                    {props.page === 'Find'
                        ?
                        <FindContainer
                            refs={[inputYear,
                                inputLikes,
                                inputCounty]}
                        />
                        : null
                    }

                    <div id="movies-container" className="noScroll" style={{
                        minHeight: props.page === 'Find' ? '100vh' : '100vh',
                        // height: '200px',
                        // paddingBottom: '50px'
                    }} >

                        {props.page === 'search' ?

                            props.finalInput ?

                                <div key={0}>
                                    <ContainerPoster
                                        index={0}
                                        id={0}
                                        type={[global.searchInput, 'search']}
                                        page={props.page}
                                        languagh={global.language}
                                    />
                                    <div id="search-movies">
                                        {
                                            GallLery.search.MAIN_ID === 0
                                                ?
                                                GallLery.search.SEARCHES.length > 0
                                                    ?
                                                    GallLery.search.SEARCHES.map((item, j) => {
                                                        return <ContainerDetails
                                                            id={GallLery.search.MAIN_ID}
                                                            key={j}
                                                            index={j}
                                                            languagh={global.language}
                                                            detailMovie={item}
                                                        />
                                                    })
                                                    : null
                                                : null
                                        }
                                    </div>

                                </div>
                                :
                                null
                            :

                            GallLery.geners.length > 0 && GallLery.geners.map((type, i) => {
                                return <div key={i}>
                                    <ContainerPoster
                                        index={0}
                                        id={i}
                                        type={type}
                                        page={props.page}
                                        languagh={global.language}
                                        dataFind={{
                                            inputLanguagh: inputCounty.current ? inputCounty.current.value : '',
                                            inputLikes: inputLikes.current ? inputLikes.current.value : '',
                                            inputYear: inputYear.current ? inputYear.current.value : ''
                                        }}
                                    />


                                    <div id="search-movies">
                                        {GallLery.search.MAIN_ID === i
                                            ?
                                            GallLery.search.SEARCHES.length > 0
                                                ?
                                                GallLery.search.SEARCHES.map((item, j) => {

                                                    return <ContainerDetails
                                                        id={GallLery.search.MAIN_ID}
                                                        key={j}
                                                        index={j}
                                                        languagh={global.language}
                                                        detailMovie={item}
                                                    />
                                                })
                                                : null
                                            : null
                                        }
                                    </div>
                                </div>
                            })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
