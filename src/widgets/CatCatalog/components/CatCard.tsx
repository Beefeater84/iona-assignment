import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Cat } from "../../../entities/cats/types/types";

interface CatCardProps {
  cat: Cat;
}

function CatCard({ cat }: CatCardProps) {
  return (
    <Col className="col-md-3 col-sm-6 col-12 pb-4">
      <Card>
        <Card.Img
          style={{
            aspectRatio: `${cat.width}/${cat.height}`,
          }}
          variant="top"
          src={cat.url}
        />
        <Card.Body>
          <a href={cat.id} className="full-width block-display">
            <Button variant="primary" className="full-width">
              View details
            </Button>
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CatCard;
