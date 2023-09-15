import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import NoCatsAvailable from "./components/NoCatsAvailable";

function Home() {
  return (
    <Container>
      <Row>
        <h1>Cat Browser</h1>
      </Row>
      <Row className="mt-3 mb-3">
        <Form.Group controlId="formFile" className="col-md-3 col-sm-6 col-12">
          <Form.Label>Breed</Form.Label>
          <Form.Select aria-label="Choose the breed of cat">
            <option>Select breed</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <NoCatsAvailable />
    </Container>
  );
}

export default Home;
