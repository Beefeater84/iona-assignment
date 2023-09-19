import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Cat } from "../../../entities/cats/types/types";
import { ARIA_LABEL_CAT_LINK, CAT_IMG_ALT_TEXT } from "../consts/consts";

interface CatCardProps {
  cat: Cat;
}

function CatCard({ cat }: CatCardProps) {
  return (
    <Col className="col-md-3 col-sm-6 col-12 pb-4">
      <Card>
        <Card.Img
          alt={CAT_IMG_ALT_TEXT}
          style={{
            aspectRatio: `${cat.width}/${cat.height}`,
          }}
          variant=" top"
          src={cat.url}
        />
        <Card.Body>
          <a
            href={cat.id}
            className="full-width block-display"
            aria-label={ARIA_LABEL_CAT_LINK}
          >
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
