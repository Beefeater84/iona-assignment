import { useMemo, useState } from "react";
import BreedContext from "./BreedContext";
import { BreedId } from "../types/types";

interface BreedProviderProps {
  children: React.ReactNode;
}

function BreedProvider({ children }: BreedProviderProps) {
  const [selectedBreed, setSelectedBreed] = useState<BreedId | null>(null);

  const value = useMemo(() => {
    return { selectedBreed, setSelectedBreed };
  }, [selectedBreed, setSelectedBreed]);

  return (
    <BreedContext.Provider value={value}>{children}</BreedContext.Provider>
  );
}

export default BreedProvider;
