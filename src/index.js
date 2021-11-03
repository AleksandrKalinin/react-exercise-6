import React, { Fragment }  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Photos from './Photos';
import Header from './Header';
import UserDetails from './UserDetails';
import Albums from './Albums';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';
import store from './store/index';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function PrivateRoute({ children, ...rest }) {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    user = {};
    user.isAuthenticated = false;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function HomeRoute({ children, ...rest }) {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    user = {};
    user.isAuthenticated = false;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? (
          <Redirect
            to={{
              pathname: `/user/${user.id}`,
              state: { from: location }
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/albums",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorBoundary>
        <Router>
          <Switch>
            <HomeRoute exact path="/">
              <App />
            </HomeRoute>
            <HomeRoute exact path="/home">
              <App />
            </HomeRoute>            
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/albums">
              <>
                <Header />
                <Albums />
              </> 
            </Route>
            <Route exact path="/albums/:id">
              <>
                <Header />
                <Photos />
              </>  
            </Route>        
            <PrivateRoute exact path="/user/:id">
              <>
                <Header />
                <UserDetails />
                <Albums />
              </>
            </PrivateRoute> 
            <PrivateRoute path="/user/:id/albums/:id">
                <Header />
                <UserDetails />
                <Photos />
            </PrivateRoute>                     
          </Switch>                 
        </Router>
      </ErrorBoundary>  
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

