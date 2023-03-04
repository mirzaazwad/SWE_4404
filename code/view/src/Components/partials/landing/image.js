import { Image } from "react-bootstrap";
const LandingImage = () => {
  return (
    <div className="LandingImage">
      <Image
      src="background.jpg"
      className="mt-5 unmobView"
      width='55%'
      flex-wrap="wrap"
      alt="bootstrap"
      fluid
    />
    </div>
  );
};

export default LandingImage;
