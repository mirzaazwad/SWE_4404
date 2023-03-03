import { Image } from "react-bootstrap";
const LandingImage = () => {
  return (
    <div className="LandingImage">
      <Image
      src="background.jpg"
      className="d-block m-auto"
      alt="bootstrap"
      width={'50%'}
      fluid
    />
    </div>
  );
};

export default LandingImage;
