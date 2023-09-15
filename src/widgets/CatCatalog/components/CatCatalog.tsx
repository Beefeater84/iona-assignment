import React from "react";
import NoCatsAvailable from "../../../pages/MainPage/components/NoCatsAvailable";
import useGetCatsByBreed from "../../../entities/cats/hooks/useGetCatsByBreed";

export default function CatCatalog() {
  const { data, error, isLoading } = useGetCatsByBreed();

  console.log(!data || data?.length === 0);

  if (!data && data?.length === 0) {
    return <NoCatsAvailable />;
  }

  return null;
}
