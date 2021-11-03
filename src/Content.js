import { useState, useEffect, Fragment, useRef} from 'react';
import { Container, Row, Col, Table, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums, getPhotos, addAlbum, addPhoto } from './actions/index';
import Portal from './Portal';
import EmptyTemplate from './EmptyTemplate';
import { Link, useRouteMatch } from 'react-router-dom';

function Content() {

  const dispatch = useDispatch();
  const albumsList = useSelector(state => state.albumsArray.albums);

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch]);

  const [albums, setAlbums] = useState([]);
  const [isSuccesful, setStatus] = useState(false);

  const [currentAlbum, setCurrentAlbum] = useState(null);

  const [isOn, setOn] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [currentFunction, setCurrentFunction] = useState(null);

  useEffect(() => {
    setAlbums(albumsList);
    setStatus(true);
  }, [albumsList])

  const createAlbum = (name) => {
    if (name !== '') {
      const newItem = {};
      newItem.id = albumsList.length + 1;
      newItem.userId = newItem.id;
      newItem.title = name;
      newItem.photos = [];
      dispatch(addAlbum(newItem));
      setOn(false);
      setInputValue('');
    } else {
      alert('Please enter correct name value');
    }
  }

  const checkExecution = (e) => {
    setCurrentFunction(() => createAlbum);
    setOn(true);
  }

  //scrollToTarget hook
  const refFooter = useRef();
  const scrollToTarget = () => refFooter.current.scrollIntoView();

  //useOnClickOutside of modal hook
  const refModal = useRef();  
  useOnClickOutside(refModal, () => closeModal());

  function useOnClickOutside(ref, handler) {
    useEffect(() => {     
      if (isOn) {
          const listener = (e) => {
            if ( (!ref.current || ref.current.contains(e.target)) ) {
              return;
            }
            handler(e);
          };
          document.addEventListener("click", listener);
          return () => {
            document.removeEventListener("click", listener);
          };
        } 
      }, [ref, handler]
    ); 
  }

  //usePrevious hook
  const prevInputValue = usePrevious(inputValue);
  function usePrevious(val) {
    const elRef = useRef();
    useEffect(() => {
      elRef.current = val;
    });
    return elRef.current;
  }

  //useComponentDidUnmount
  function useComponentDidUnmount(callback){
    useEffect(() => {

      return () => {
        callback();
      }
    }, [])
  }

  //close Modal

  const closeModal = () => {
    setOn(false);
    setInputValue('');
  }

  let { path, url } = useRouteMatch();

  return (
    <>
      <Container>
        <div className="scroll-button" onClick={scrollToTarget}>
          <img src={window.location.origin + "/arrow.png"} alt="" />
        </div>
          <Row>
            <Col>
              {isSuccesful ?
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((item, index) =>
                      <tr key={item.id} >
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{/*<Link to={`albums/${item.id}`}>Open</Link>*/}
                            <Link to={`${url}/albums/${item.id}`}>Open</Link>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="3">
                        <Button onClick={checkExecution} id="albumButton" className="styled-button">Add new album</Button>
                      </td>
                    </tr>                      
                  </tbody>
                </Table>                    
                : <div>Loading...</div>}
            </Col>
          </Row>
        { isOn ? 
        <Portal>
          <Modal.Dialog aria-labelledby="contained-modal-title-vcenter" centered ref={refModal}>
            <Modal.Header>
              <Modal.Title>Album modal</Modal.Title>
              <div className="close-icon" onClick={closeModal}>
                <img src={window.location.origin + "/close.png"} />
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-label">Please add name of an album in the text field below</Form.Label>
                  <Form.Control defaultValue = {inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="New album" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="button-group">
              <Button variant="success" className="styled-button" onClick={closeModal} >
                Close
              </Button>                  
              <Button variant="primary" className="styled-button" onClick={currentFunction.bind(null, inputValue)} >
                Save item
              </Button>
            </Modal.Footer>            
          </Modal.Dialog>          
        </Portal> : null }
      </Container>
      <div className="footer" ref={refFooter}></div>
    </>  
  );
}

export default Content;
