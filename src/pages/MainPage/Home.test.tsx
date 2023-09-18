import React from "react";
import { render, screen, within } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import BreedProvider from "../../entities/cats/context/BreedProvider";
import { queryClient, router } from "../../index";
import useGetBreed from "../../entities/cats/hooks/useGetBreed";
import breed from "./mocks/mockBreeds";
import getBreedName from "../../entities/cats/mapping/getBreedName";
import useGetCatsByBreed from "../../entities/cats/hooks/useGetCatsByBreed";

jest.mock("../../entities/cats/hooks/useGetBreed");
const mockedUseGetBreed = useGetBreed as jest.Mock;

jest.mock("../../entities/cats/hooks/useGetCatsByBreed");
const mockedUseGetCatsByBreed = useGetCatsByBreed as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  queryClient.clear();
});

test("renders learn react link", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation(() => ({
    isLoading: false,
    data: null,
    error: null,
  }));
  render(
    <QueryClientProvider client={queryClient}>
      <BreedProvider>
        <RouterProvider router={router} />
      </BreedProvider>
    </QueryClientProvider>,
  );
  const selectElement = screen.getByLabelText(/Choose the breed of cat/i);
  const options = within(selectElement).getAllByRole("option");
  expect(options).toHaveLength(breed.length + 1);
});
