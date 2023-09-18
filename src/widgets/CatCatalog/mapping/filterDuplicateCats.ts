import { Cat } from "../../../entities/cats/types/types";

export default function filterDuplicateCats(
  existingCats: Cat[],
  newCats: Cat[],
): Cat[] {
  const catMap = new Map(existingCats.map((cat) => [cat.id, cat]));

  newCats.forEach((cat) => {
    if (!catMap.has(cat.id)) {
      catMap.set(cat.id, cat);
    }
  });

  return Array.from(catMap.values());
}
