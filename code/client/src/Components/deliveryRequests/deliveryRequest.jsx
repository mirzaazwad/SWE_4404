import { useToken } from "../../Hooks/useToken";
import NavbarDelivery from "../partials/profile/navbarDelivery";

const DeliveryRequest = () => {
  const user=useToken();
  return ( 
    <div className="deliveryRequest">
      <NavbarDelivery/>
    </div>
   );
}
 
export default DeliveryRequest;