import { Link } from "react-router-dom";
import PharmacyCard from "./pharmacyCard";

const PharmacyArray = ({id,pharmacies}) => {
  return ( 
    <div className="row">
            {pharmacies.map((pharmacy) => (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={pharmacy.id}>
                <Link to={`/Pharmacy?id=${pharmacy.id}&pid=${pharmacy.pharmacyManagerID}&cid=${id}`} style={{textDecoration: 'none', color: 'white'}} >
                  <PharmacyCard
                    name={pharmacy.name}
                    location={pharmacy.location}
                    image={pharmacy.imageURL}
                    color= {'#EB006F'}
                  />
                </Link>
              </div>
            ))}
          </div>
   );
}
 
export default PharmacyArray;