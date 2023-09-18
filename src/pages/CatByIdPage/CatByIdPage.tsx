import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useGetCatById from "../../entities/cats/hooks/getCatById";
import "./catById.scss";

export default function CatByIdPage() {
  const { catId } = useParams();
  const { data, error, isLoading } = useGetCatById({ url: catId });

  if (!data) return null;

  const { name, origin, description, temperament } = data.breeds[0];

  return (
    <Container>
      <div className="catByIdPage">
        <Card>
          <Card.Header>
            <Button>Back</Button>
          </Card.Header>
          <img src={data.url} alt="" />
          <Card.Body>
            <h1>{name}</h1>
            {origin && <p className="origin">Origin: {origin}</p>}
            {temperament && <p className="temperament">{temperament}</p>}
            {description && <p>{description}</p>}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
