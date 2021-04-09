import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import AdminRoute from './components/AdminRoute/AdminRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// const Landing = React.lazy(() => import('./components/Landing/Landing'))
const WorkInProgress = React.lazy(() => import('./components/WorkInProgress/WorkInProgress'))
const Auth = React.lazy(() => import('./components/Auth/Auth'))
const RestaurantLanding = React.lazy(() => import('./components/Restaurants/Landing'))
const RestaurantMenu = React.lazy(() => import('./components/Restaurants/Menu'))
const AdminMain = React.lazy(() => import('./components/Admin/AdminMain'))
const AdminPreferences = React.lazy(() => import('./components/Admin/Preferences/AdminPreferences'))
const AdminRestaurant = React.lazy(() => import('./components/Admin/Restaurants/AdminRestaurant'))
const AdminRestaurantMenu = React.lazy(() => import('./components/Admin/Restaurants/AdminRestaurantMenu'))
const UserPreferences = React.lazy(() => import('./components/Users/UserPreferences'))

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/comingsoon' component={WorkInProgress} />
        <Route exact path='/signin' component={Auth} />
        <Route exact path='/restaurants/:id' component={RestaurantLanding} />
        <Route exact path='/menu/:id' component={RestaurantMenu} />
        <AdminRoute exact path='/admin' component={AdminMain} />
        <AdminRoute exact path='/admin/preferences' component={AdminPreferences} />
        <AdminRoute exact path='/admin/restaurants' component={AdminRestaurant} />
        <AdminRoute exact path='/admin/restaurants/:id' component={AdminRestaurantMenu} />
        <PrivateRoute exact path='/users/:id' component={UserPreferences} />
      </Switch>
    </>
  );
}

export default App;
