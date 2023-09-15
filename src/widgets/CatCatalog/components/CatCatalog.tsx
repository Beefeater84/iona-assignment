import { useContext } from "react";
import BreedContext from "../../../entities/cats/context/BreedContext";

export default function CatCatalog() {
  const context = useContext(BreedContext);
  const { selectedBreed } = context;

  console.log(selectedBreed);

  return <h1>Hello</h1>;
}
