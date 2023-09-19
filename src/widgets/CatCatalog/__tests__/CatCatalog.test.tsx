import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import useGetBreed from "../../../entities/cats/hooks/useGetBreed";
import useGetCatsByBreed from "../../../entities/cats/hooks/useGetCatsByBreed";
import { queryClient, router } from "../../../index";
import getBreedName from "../../../entities/cats/mapping/getBreedName";
import breed from "../../../pages/MainPage/mocks/mockBreeds";
import {
  mockCats,
  mockCatsPage1,
  mockCatsPage2,
  mockCatsPage2With5Duplicates,
} from "../../../pages/MainPage/mocks/mockCats";
import BreedProvider from "../../../entities/cats/context/BreedProvider";
import { CAT_IMG_ALT_TEXT } from "../consts/consts";
import { noCatsText } from "../../../pages/MainPage/const/consts";

jest.mock("../../../entities/cats/hooks/useGetBreed");
const mockedUseGetBreed = useGetBreed as jest.Mock;

jest.mock("../../../entities/cats/hooks/useGetCatsByBreed");
const mockedUseGetCatsByBreed = useGetCatsByBreed as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
  queryClient.clear();
});

test("Send a request when breed is chosen in Select", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation(() => ({
    isLoading: false,
    data: mockCats,
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
  fireEvent.change(selectElement, { target: { value: breed[0].id } });
  expect(mockedUseGetCatsByBreed).toHaveBeenCalled();
  fireEvent.change(selectElement, { target: { value: breed[1].id } });
  expect(mockedUseGetCatsByBreed).toHaveBeenCalled();
});

test("Show cats with in Catalog", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation(() => ({
    isLoading: false,
    data: mockCats,
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
  fireEvent.change(selectElement, { target: { value: breed[0].id } });
  const catCards = screen.getAllByAltText(CAT_IMG_ALT_TEXT);
  expect(catCards).toHaveLength(mockCats.length);
});

test("Show NoCatsAvailable when no cats", () => {
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

  const noCatsAvailable = screen.getByText(noCatsText);
  expect(noCatsAvailable).toBeInTheDocument();
});

test("Load cats then click 'Load more' btn", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation((page) => ({
    isLoading: false,
    data: page === 1 ? mockCatsPage1 : mockCatsPage2,
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
  fireEvent.change(selectElement, { target: { value: breed[0].id } });

  const catCards = screen.getAllByAltText(CAT_IMG_ALT_TEXT);
  expect(catCards).toHaveLength(mockCatsPage1.length);

  const LoadMore = screen.getByText("Load more");
  userEvent.click(LoadMore);

  const allCatCards = screen.getAllByAltText(CAT_IMG_ALT_TEXT);
  expect(allCatCards).toHaveLength(mockCatsPage1.length + mockCatsPage2.length);
});

test("Show only unique cat cards", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation((page) => ({
    isLoading: false,
    data: page === 1 ? mockCatsPage1 : mockCatsPage2With5Duplicates,
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
  fireEvent.change(selectElement, { target: { value: breed[0].id } });

  const catCards = screen.getAllByAltText(CAT_IMG_ALT_TEXT);
  expect(catCards).toHaveLength(mockCatsPage1.length);

  const LoadMore = screen.getByText("Load more");
  userEvent.click(LoadMore);

  const allCatCards = screen.getAllByAltText(CAT_IMG_ALT_TEXT);
  expect(allCatCards).toHaveLength(15);
});

test("Show 'Load more' btn if came 10 cats", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation(() => ({
    isLoading: false,
    data: mockCatsPage2,
    error: null,
  }));

  render(
    <QueryClientProvider client={queryClient}>
      <BreedProvider>
        <RouterProvider router={router} />
      </BreedProvider>
    </QueryClientProvider>,
  );

  const LoadMore = screen.getByText("Load more");
  expect(LoadMore).toBeInTheDocument();
});

test("Don't Show 'Load more' btn if came less then 10 cats", () => {
  mockedUseGetBreed.mockImplementation(() => ({
    isLoading: false,
    data: getBreedName(breed),
    error: null,
  }));

  mockedUseGetCatsByBreed.mockImplementation(() => ({
    isLoading: false,
    data: mockCats,
    error: null,
  }));

  render(
    <QueryClientProvider client={queryClient}>
      <BreedProvider>
        <RouterProvider router={router} />
      </BreedProvider>
    </QueryClientProvider>,
  );

  const LoadMore = screen.queryByText("Load more");
  expect(LoadMore).not.toBeInTheDocument();
});
