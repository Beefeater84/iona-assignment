import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import NoCatsAvailable from "./components/NoCatsAvailable";
import useGetBreed from "../../entities/cats/hooks/useGetBreed";

function Home() {
  const { data, error, isLoading } = useGetBreed();

  return (
    <Container>
      <Row>
        <h1>Cat Browser</h1>
      </Row>
      <Row className="mt-3 mb-3">
        <Form.Group controlId="formFile" className="col-md-3 col-sm-6 col-12">
          <Form.Label>Breed</Form.Label>
          <Form.Select
            aria-label="Choose the breed of cat"
            disabled={isLoading || !!error}
          >
            <option>Select breed</option>
            {data &&
              data.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <NoCatsAvailable />
    </Container>
  );
}

export default Home;
