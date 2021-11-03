import { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserInfo(props) {

/*
  const userData = useSelector(state => state.userReducer.user);

  const [isOpen, setVisibility] = useState(false);

  const [data, setData] = useState(userData)

  useEffect(() => {
    setData(userData);
  }, [userData])

  function changeVisibility() {
    setVisibility(!isOpen);
  }
*/

  const [userData, setUserData] = useState(null);

  const [isOpen, setVisibility] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, [])

  function changeVisibility() {
    setVisibility(!isOpen);
  }
  return (
    <div>  
      {userData ?
        <>
          <p><span className="bold">Username: </span>{userData.name}</p>
          <p><span className="bold">Email: </span>blabla@mail.ru</p>
        </>  
      : null}
      {isOpen ?
        <>
          <p><span className="bold">Phone </span>1-770-736-8031 x56442</p>
          <p><span className="bold">Website: </span>hildegard.org</p>
          <p><span className="bold">City: </span>Gwenborough</p>
          <p><span className="bold">Address: </span>Kulas Light</p>
        </>
      : null}
      <Button onClick = {changeVisibility}>{isOpen ? 'Less information' : 'More information' }</Button>
    </div>
  );
}

export default UserInfo;
