import { useContext } from "react";
import { useQuery } from "react-query";
import BreedContext from "../context/BreedContext";
import api from "../api/axios";

export default function useGetCatsByBreed(page = 1) {
  const context = useContext(BreedContext);

  if (!context) {
    throw new Error("Компонент должен быть внутри BreedProvider");
  }

  const { selectedBreed } = context;

  const { data, error, isLoading } = useQuery(
    [selectedBreed, page],
    () =>
      api.get("/images/search", {
        params: {
          breed_id: selectedBreed,
          limit: 10,
          page,
        },
      }),
    {
      enabled: !!selectedBreed, // запрос будет выполнен только если selectedBreed определен
    },
  );

  return { data: data?.data, error, isLoading };
}

// search?page=1&limit=10&breed_id=abob
