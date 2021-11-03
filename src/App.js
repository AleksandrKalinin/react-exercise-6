import { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import UserDetails from './UserDetails';
import Content from './Content';

function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    if ( localStorage.getItem('user') !== null ) {
      const username = JSON.parse(localStorage.getItem('user')).name;
      setUser(username);
    }
  },[])

  const logOut = () => {
    localStorage.clear();
    window.location.pathname = '/login';
  }

  return (
    <Fragment>
        <div className="header">
          {user ?
            <div className="header-info">
              <span className="header-info__user">Welcome, {user} </span>
              <Button onClick={logOut}>Logout</Button>
            </div>  
           : null}
        </div>
      <div className='main'>
        <UserDetails />
        <Content />
      </div>
    </Fragment>
  );    
}

export default App;
