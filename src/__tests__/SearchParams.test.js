import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import petfinder, { _breeds, _dogs, ANIMALS } from "petfinder-client";
import SearchParams from "../SearchParams";

afterEach(cleanup);

test("SearchParams", async () => {
  const pf = petfinder();
  const { container, getByTestId, getByText } = render(<SearchParams />);

  const animalDropdown = getByTestId("use-dropdown-animal");
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1);

  expect(pf.breed.list).toHaveBeenCalled();
  const breedDropdown = getByTestId("use-dropdown-breed");
  expect(breedDropdown.children.length).toEqual(_breeds.length + 1);

  const searchResults = getByTestId("search-results");
  expect(searchResults.textContent).toEqual("No Pets Found");
  fireEvent(getByText("Submit"), new MouseEvent("click"));
  expect(pf.pet.find).toHaveBeenCalled();
  expect(searchResults.children.length).toEqual(
    _dogs.petfinder.pets.pet.length
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="search-params"
>
  <form>
    <label
      for="location"
    >
      Location
      <input
        id="location"
        placeholder="Location"
        value="Seattle, WA"
      />
    </label>
    <label
      for="use-dropdown-animal"
    >
      Animal
      <select
        data-testid="use-dropdown-animal"
        id="use-dropdown-animal"
      >
        <option />
        <option
          value="dog"
        >
          dog
        </option>
        <option
          value="cat"
        >
          cat
        </option>
        <option
          value="bird"
        >
          bird
        </option>
      </select>
    </label>
    <label
      for="use-dropdown-breed"
    >
      Breed
      <select
        data-testid="use-dropdown-breed"
        id="use-dropdown-breed"
      >
        <option />
        <option
          value="Bichon Frise"
        >
          Bichon Frise
        </option>
        <option
          value="Bolognese"
        >
          Bolognese
        </option>
        <option
          value="Bolonka"
        >
          Bolonka
        </option>
        <option
          value="Coton de Tulear"
        >
          Coton de Tulear
        </option>
        <option
          value="Havanese"
        >
          Havanese
        </option>
        <option
          value="Lowchen"
        >
          Lowchen
        </option>
        <option
          value="Maltese"
        >
          Maltese
        </option>
      </select>
    </label>
    <label
      for="location"
    >
      Theme
      <select>
        <option
          value="peru"
        >
          Peru
        </option>
        <option
          value="darkblue"
        >
          Dark Blue
        </option>
        <option
          value="chartreuse"
        >
          Chartreuse
        </option>
        <option
          value="mediumorchid"
        >
          Medium Orchid
        </option>
      </select>
    </label>
    <button
      style="background-color: green;"
    >
      Submit
    </button>
  </form>
  <div
    class="search"
    data-testid="search-results"
  >
    <a
      class="pet"
      href="/details/0000"
    >
      <div
        class="image-container"
      >
        <img
          alt="Luna"
          src="http://photos.petfinder.com/photos/pets/43884893/1/?bust=1548744791&width=300&-pn.jpg"
        />
      </div>
      <div
        class="info"
      >
        <h1>
          Luna
        </h1>
        <h2>
          Dog — Havanese — Puyallup, WA
        </h2>
      </div>
    </a>
    <a
      class="pet"
      href="/details/0001"
    >
      <div
        class="image-container"
      >
        <img
          alt="Piper"
          src="http://photos.petfinder.com/photos/pets/43884811/1/?bust=1548744501&width=300&-pn.jpg"
        />
      </div>
      <div
        class="info"
      >
        <h1>
          Piper
        </h1>
        <h2>
          Dog — Havanese — Puyallup, WA
        </h2>
      </div>
    </a>
    <a
      class="pet"
      href="/details/44114309"
    >
      <div
        class="image-container"
      >
        <img
          alt="Lolita and Charlotte"
          src="http://photos.petfinder.com/photos/pets/44114309/1/?bust=1551287084&width=300&-pn.jpg"
        />
      </div>
      <div
        class="info"
      >
        <h1>
          Lolita and Charlotte
        </h1>
        <h2>
          Dog — Havanese — Blaine, WA
        </h2>
      </div>
    </a>
  </div>
</div>
`);
});
