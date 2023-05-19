import NavbarLanding from "../partials/landing/navbarLanding";
import { Image } from "react-bootstrap";

const Error500 = () => {
  return ( 
    <div className="error">
      <NavbarLanding/>
      <div className="innerContent">
        <h1 style={{marginTop:'5%',marginLeft:'5%'}}>Error 500</h1>
        <p style={{marginLeft:'5%'}}>Internal Server Error: Sorry for the inconvenience</p>
        <Image src="/background.jpg" alt="URL is invalid" style={{marginLeft:'5%',width:"40%",height:"50vh"}}></Image>
      </div>
    </div>
   );
}
 
export default Error500;