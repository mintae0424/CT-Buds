import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing'

// const Landing = React.lazy(() => import('./components/Landing/Landing'))
const WorkInProgress = React.lazy(() => import('./components/WorkInProgress/WorkInProgress'))
const Auth = React.lazy(() => import('./components/Auth/Auth'))

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/comingsoon' component={WorkInProgress} />
        <Route exact path='/signin' component={Auth} />
      </Switch>
    </>
  );
}

export default App;
