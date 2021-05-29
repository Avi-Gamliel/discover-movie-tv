
import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Explore from './Components/Explore'
import Home from './Components/Home'
import { createBrowserHistory } from "history";

const Device = window.innerWidth <= 500 ? true : false;
const history = createBrowserHistory()

function App() {

  const [valueInput, setInput] = useState('')
  const [finalInput, setFinalInput] = useState(false)

  useEffect(() => {
    let check = true

    if (check) {
      setFinalInput(false)
      setTimeout(() => {
        setFinalInput(true)
      }, 200);

    }

    return () => {
      check = false
    }

  }, [valueInput])

  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={Home} />

        <Switch>
          <Route path="/explore" component={() => <Explore
            page={'Explore'}
            setFinalInput={setFinalInput}
            setInput={setInput}
          />} />

          <Route path="/search" render={(params) => <Explore
            page={'search'}
            valueInput={valueInput}
            finalInput={finalInput}
            setFinalInput={setFinalInput}
            setInput={setInput}
            {...params}
          />} />

          <Route path="/geners" component={() => <Explore
            page={'Geners'}
            setFinalInput={setFinalInput}
            setInput={setInput}
          />} />

          <Route path="/find" component={() => <Explore
            page={'Find'}
            setFinalInput={setFinalInput}
            setInput={setInput}
          />} />
          <Redirect from='*' to='/' />
        </Switch>


      </Router>
    </div>
  );
}

export default App;
