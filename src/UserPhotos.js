import { useState, useEffect, Fragment, useRef} from 'react';
import { Container, Row, Col, Table, Card, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums, getPhotos, addAlbum, addPhoto } from './actions/index';
import Portal from './Portal';
import UserDetails from './UserDetails';
import EmptyTemplate from './EmptyTemplate';
import { Link, useParams } from 'react-router-dom';

function UserPhotos() {

  const dispatch = useDispatch();
  const albumsList = useSelector(state => state.albumsArray.albums);
  const photosList = useSelector(state => state.photosArray.photos);

  useEffect(() => {
    dispatch(getAlbums())
  }, [dispatch]);

  const [albums, setAlbums] = useState([]);
  const [isSuccesful, setStatus] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [photosShown, openPhotos] = useState(false);

  const [currentAlbum, setCurrentAlbum] = useState(null);

  const [isOn, setOn] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [currentFunction, setCurrentFunction] = useState(null);

  useEffect(() => {
    setAlbums(albumsList);
    setStatus(true);
  }, [albumsList])

  useEffect(() => {
    if (isSuccesful === true) {
      setPhotos(photosList);      
    }
  }, [photosList])

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPhotos(id))
    setCurrentAlbum(id);
  }, [])

  const createPhoto = (name) => {
    if (name !== '') {
      const photo = {};
      photo.title = 'Lorem ipsum dolor sit ament';
      photo.url = `${window.location.origin}/token-image.jpg`;
      photo.id = photosList.length + 1;
      dispatch(addPhoto(photo));
      setOn(false);
      setInputValue('');
    } else {
      alert('Please enter correct name value');
    }
  }

  const checkExecution = (e) => {
    setCurrentFunction(() => createPhoto);
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

  return (
    <>
      <UserDetails />
      <Container>
        <div className="scroll-button" onClick={scrollToTarget}>
          <img src={window.location.origin + "/arrow.png"} alt="" />
        </div>
          <Fragment>
            <Row>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <Link to="/"><Button className="styled-button">Back to albums</Button></Link>
              </Col>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <p className="current-album">Photos for album {currentAlbum}</p>
              </Col>
                <Fragment>
                  {photos.map((item) => 
                    <Col md={4} lg={4} xs={4} key={item.id}>
                      <Card className="styled-card">
                        <Card.Img variant="top" src={item.url} />
                        <Card.Body>
                          <Card.Text>
                            {item.title}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                </Fragment>
            </Row>
            <Row>
              <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
                <Button onClick={checkExecution} id="photoButton" className="styled-button">Add photo</Button>
              </Col>            
            </Row>
          </Fragment>  
        { isOn ? 
        <Portal>
          <Modal.Dialog aria-labelledby="contained-modal-title-vcenter" centered ref={refModal}>
            <Modal.Header>
              <Modal.Title>Photo modal</Modal.Title>
              <div className="close-icon" onClick={closeModal}>
                <img src={window.location.origin + "/close.png"} />
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-label">Please add name of an photo in the text field below</Form.Label>
                  <Form.Control defaultValue = {inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="New photo" />
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

export default UserPhotos;
