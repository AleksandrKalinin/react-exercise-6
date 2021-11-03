import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Header() {

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

  const logIn = () => {
    window.location.pathname = '/login';
  }  

    return (
        <div className="header">
          {user ?
            <div className="header-info">
              <span className="header-info__user">Welcome, {user} </span>
              <Button onClick={logOut}>Logout</Button>
            </div>  
           : 
            <div className="header-info">
              <span className="header-info__user">You are not authorised </span>
              <Button onClick={logIn}>Login</Button>
            </div>
          }
        </div>
    );
  }

export default Header;
