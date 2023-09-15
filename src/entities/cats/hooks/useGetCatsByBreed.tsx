import { useContext } from "react";
import { useQuery } from "react-query";
import BreedContext from "../context/BreedContext";
import api from "../api/axios";
import { Cat } from "../types/types";

export default function useGetCatsByBreed(page = 1) {
  const context = useContext(BreedContext);

  if (!context) {
    throw new Error("Component should be used inside BreedProvider");
  }

  const { selectedBreed } = context;

  const { data, error, isLoading } = useQuery(
    [selectedBreed, page],
    () =>
      api.get<Cat[]>("/images/search", {
        params: {
          breed_id: selectedBreed,
          limit: 10,
          page,
        },
      }),
    {
      enabled: !!selectedBreed,
    },
  );

  return { data: data?.data, error, isLoading };
}
