import { Card } from "react-bootstrap";
import Loader from '../../partials/loader';

const Loading = (props) =>{
  return (
      <Card>
      <Card.Header>Loading
      </Card.Header>
      <Card.Body>
      <Loader/>
      </Card.Body>
    </Card>
  );
}

export default Loading;