import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import useGetCatById from "../../entities/cats/hooks/getCatById";

export default function CatByIdPage() {
  const { catId } = useParams();
  const { data, error, isLoading } = useGetCatById({ url: catId });

  if (!data) return null;

  return (
    <Container>
      <Row>
        <Card>
          <img src={data.url} alt="" />
        </Card>
      </Row>
    </Container>
  );
}
