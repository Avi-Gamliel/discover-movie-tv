import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css'

function Home(props) {
    const global = useSelector(state => state.GLOBAL)
    console.log(props);
    const fullScreen = (e) => {
        if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
            document.body.mozRequestFullScreen();
        } else if (window.navigator.userAgent.indexOf('Android') !== -1) {
            document.body.requestFullscreen();
        }
    }
    return (
        <div style={styles.container}>
            <Link to="/explore" >
                <div className="btnStart" alt="" onClick={(e) => fullScreen(e)}></div>
            </Link>
            <h4 style={{ ...styles.title, fontSize: global.mobile ? 24 : 36 }}>Find / Discover / Search</h4>
            <span style={{ ...styles.subTitle, fontSize: global.mobile ? 10 : 16 }}>Trailers / Details / Where To Watch / Similar finder  </span>
            <div style={styles.imgBlack}></div>
            <div className="mainBackground" alt="" ></div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        color: 'white',
        margin: 0,
        marginTop: 5,
        padding: 'none'
    },
    subTitle: {
        color: 'white',
    },
    imgBlack: {
        zIndex: -10,
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
        width: '100%',
        height: '100%'
    }
}
export default Home
