import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CatBreed } from "../../../entities/cats/types/types";
import useGetBreed from "../../../entities/cats/hooks/useGetBreed";
import BreedContext from "../../../entities/cats/context/BreedContext";

export default function SelectBreed() {
  const { data, error, isLoading } = useGetBreed();
  const context = useContext(BreedContext);
  const location = useLocation();
  const navigate = useNavigate();

  const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!context) return;
    const { setSelectedBreed } = context;
    const selectedBreedId = e.target.value;
    setSelectedBreed(selectedBreedId);
  };

  useEffect(() => {
    // if we came from CatByIdPage with "Back" btn, we need to set selected breed
    if (!context) return;
    const breedId = location.state?.breedId;

    if (breedId && data) {
      const { setSelectedBreed } = context;
      setSelectedBreed(breedId);

      // remove breedId from location state
      const newState = { ...location.state };
      delete newState.breedId;
      navigate(location.pathname, { state: newState, replace: true });
    }
  }, [data]);

  const currentBreedId = location.state?.breedId || context?.selectedBreed;
  return (
    <Row className="mt-3 mb-3">
      <Form.Group controlId="formFile" className="col-md-3 col-sm-6 col-12">
        <Form.Label>Breed</Form.Label>
        <Form.Select
          aria-label="Choose the breed of cat"
          onChange={onSelectChangeHandler}
          disabled={isLoading || !!error}
          value={currentBreedId || "undefined"}
        >
          <option value="undefined">Select breed</option>
          {data &&
            data.map((breed: CatBreed) => (
              <option key={breed.id} value={breed.id || ""}>
                {breed.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Row>
  );
}
