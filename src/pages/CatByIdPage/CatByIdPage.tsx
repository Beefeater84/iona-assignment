import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useGetCatById from "../../entities/cats/hooks/getCatById";
import "./catById.scss";
import BreedContext from "../../entities/cats/context/BreedContext";
import Loading from "../../shared/components/Loading/Loading";

export default function CatByIdPage() {
  const { catId } = useParams();
  const { data, error, isLoading } = useGetCatById({ url: catId });
  const context = useContext(BreedContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (!data) return null;

  const { name, origin, description, temperament, id } = data.breeds[0];

  const handleBackClick = () => {
    if (!context) window.history.back();

    navigate("/", {
      state: { breedId: id },
    });
  };

  return (
    <Container>
      <div className="catByIdPage">
        <Card>
          <Card.Header>
            <Button onClick={handleBackClick}>Back</Button>
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
