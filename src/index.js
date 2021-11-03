import React  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Photos from './Photos';
import UserPhotos from './UserPhotos';
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
              <Albums />
            </Route>
            <Route exact path="/albums/:id">
              <Photos />
            </Route>        
            <PrivateRoute exact path="/user/:id">
              <App />
            </PrivateRoute> 
            <PrivateRoute path="/user/:id/albums/:id">
              <UserPhotos />
            </PrivateRoute>                                          
            <Route path="/photos">
              <Photos />
            </Route> 
          </Switch>                 
        </Router>
      </ErrorBoundary>  
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

