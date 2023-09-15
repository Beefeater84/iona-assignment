export type Breed = string;
export type BreedId = string;
export type CatId = string;
export type CatImgUrl = string;

export type CatBreedDB = {
  weight: {
    imperial: string;
    metric: string;
  };
  id: BreedId;
  name: Breed;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: number;
  hypoallergenic: number;
  reference_image_id: string;
};

export type CatBreedsDB = CatBreedDB[];

export type CatBreed = Pick<CatBreedDB, "id" | "name">;

export type CatBreeds = CatBreed[];

export type Cat = {
  id: CatId;
  url: CatImgUrl;
  width: number;
  height: number;
};
