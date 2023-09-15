import React from "react";
import { BreedId } from "../types/types";

interface BreedContextType {
  selectedBreed: BreedId | null;
  setSelectedBreed: React.Dispatch<React.SetStateAction<BreedId | null>>;
}

const BreedContext = React.createContext<BreedContextType | undefined>(
  undefined,
);

export default BreedContext;
