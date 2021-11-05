import { Image } from 'react-bootstrap'; 

function Avatar() {
    return (
      <div className="image-wrapper">
        <Image src={window.location.origin + "/avatar.png"} roundedCircle />
      </div>
    );
  }

export default Avatar;
