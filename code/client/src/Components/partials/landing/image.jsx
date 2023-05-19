import { Image } from "react-bootstrap";
const LandingImage = () => {
  return (
    <div className="LandingImage">
      <Image
      src="LandingImage.jpg"
      className="mt-5"
      alt="bootstrap"
      fluid
      opacity="0.5"
    />
    </div>
  );
};

export default LandingImage;
