import React from "react";
import Row from "react-bootstrap/Row";
import NoCatsAvailable from "../../../pages/MainPage/components/NoCatsAvailable";
import useGetCatsByBreed from "../../../entities/cats/hooks/useGetCatsByBreed";
import CatCard from "./CatCard";

export default function CatCatalog() {
  const { data, error, isLoading } = useGetCatsByBreed();

  if (!data || data?.length === 0) {
    return <NoCatsAvailable />;
  }

  return (
    <Row xs={1} md={2} lg={4}>
      {data.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </Row>
  );
}
