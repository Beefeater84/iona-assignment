import { CatBreed, CatBreeds, CatBreedsDB } from "../types/types";

export default function getBreedName(
  breeds: CatBreedsDB | undefined,
): CatBreeds {
  if (!breeds || breeds.length === 0) return [];

  return breeds.map((breed): CatBreed => {
    return {
      name: breed.name,
      id: breed.id,
    };
  });
}
