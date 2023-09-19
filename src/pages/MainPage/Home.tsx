import React from "react";
import Container from "react-bootstrap/Container";
import CatCatalog from "../../widgets/CatCatalog/components/CatCatalog";
import SelectBreed from "../../widgets/SelectBreed/components/SelectBreed";

function Home() {
  return (
    <Container className="page">
      <h1>Cat Browser</h1>
      <SelectBreed />
      <CatCatalog />
    </Container>
  );
}

export default Home;
