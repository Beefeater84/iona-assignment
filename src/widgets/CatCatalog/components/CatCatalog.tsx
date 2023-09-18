import { useContext, useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import NoCatsAvailable from "../../../pages/MainPage/components/NoCatsAvailable";
import useGetCatsByBreed from "../../../entities/cats/hooks/useGetCatsByBreed";
import CatCard from "./CatCard";
import { Cat } from "../../../entities/cats/types/types";
import BreedContext from "../../../entities/cats/context/BreedContext";
import filterDuplicateCats from "../mapping/filterDuplicateCats";

export default function CatCatalog() {
  const context = useContext(BreedContext);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetCatsByBreed(page);
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const hasMoreData = useRef<boolean>(true);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setPage(1);
    hasMoreData.current = true;
  }, [context?.selectedBreed]);

  useEffect(() => {
    if (data && page > 1) {
      // API returns data in random order, on the page may be the same cat as on the previous page,
      // so we need to filter it by id
      const filteredCats: Cat[] = filterDuplicateCats(allCats, data);
      hasMoreData.current = filteredCats.length > allCats.length;
      setAllCats(filteredCats);
      return;
    }

    if (data && page === 1) {
      setAllCats(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!allCats || allCats?.length === 0) {
    return <NoCatsAvailable />;
  }

  return (
    <>
      <Row xs={1} md={2} lg={4}>
        {allCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </Row>
      {hasMoreData.current && (
        <Button variant="success" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </>
  );
}
