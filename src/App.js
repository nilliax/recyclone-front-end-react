import { useState } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FindBin from './pages/FindBin'
import NavBar from './components/NavBar'

function App() {

  const [isNav, setIsNav] = useState(true)

  const switchNav = () => {
    setIsNav(!isNav)
  }

  return (
    <Router>
      <div className="App">
        <div className="content">
        {isNav && <div className="nav">
            <NavBar />
          </div>}
          <Switch>
            <Route exact path="/">
              <div className="findBin">
                <FindBin switchNav={switchNav} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
