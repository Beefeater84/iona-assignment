import Row from "react-bootstrap/Row";
import { noCatsText } from "../const/consts";

export default function NoCatsAvailable() {
  return (
    <Row>
      <p>{noCatsText}</p>
    </Row>
  );
}
