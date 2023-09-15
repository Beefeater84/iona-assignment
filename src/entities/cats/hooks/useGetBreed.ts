import { useQuery } from "react-query";
import api from "../api/axios";
import getBreedName from "../mapping/getBreedName";

export default function useGetBreed() {
  const { data, error, isLoading } = useQuery("breeds", () =>
    api.get("breeds"),
  );

  if (!data) return { data, error, isLoading };

  return { data: getBreedName(data.data), error, isLoading };
}
