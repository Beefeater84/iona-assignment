import { useQuery } from "react-query";
import api from "../api/axios";
import getBreedName from "../mapping/getBreedName";

export default function useGetBreed() {
  const { data, error, isLoading } = useQuery("breeds", () =>
    api.get("breeds"),
  );

  return { data: getBreedName(data?.data), error, isLoading };
}
