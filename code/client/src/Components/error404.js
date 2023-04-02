import NavbarLanding from "./partials/landing/navbarLanding";
import { Image } from "react-bootstrap";

const Error404 = () => {
  return ( 
    <div className="error404">
      <NavbarLanding/>
      <div className="innerContent">
        <h1 style={{marginTop:'5%',marginLeft:'5%'}}>Error 404</h1>
        <p style={{marginLeft:'5%'}}>The URL you requested is not available, sorry for the inconvenience</p>
        <Image src="/dancing-monkey.gif" alt="there was supposed to be a dancing monkey to make you happy" style={{marginLeft:'5%'}}></Image>
      </div>
    </div>
   );
}
 
export default Error404;