import { useQuery } from "react-query";
import api from "../api/axios";
import { CatDetails, CatImgUrl } from "../types/types";

interface UseGetBreedProps {
  url: CatImgUrl | undefined;
}

export default function useGetCatById({ url }: UseGetBreedProps) {
  const { data, error, isLoading } = useQuery(
    [url],
    () => api.get<CatDetails>(`/images/${url}`),
    { enabled: !!url },
  );

  if (!data) return { data, error, isLoading };

  return { data: data.data, error, isLoading };
}
