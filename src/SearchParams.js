import React, { Component } from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class SearchParams extends Component {
  state = {
    location: "",
    animal: "",
    breed: "",
    breeds: []
  };

  handleLocationChange = e => {
    this.setState({
      location: e.target.value
    });
  };
  handleAnimalChange = e => {
    this.setState(
      {
        animal: e.target.value,
        breed: ""
      },
      this.getBreeds()
    );
  };
  handleBreedChange = e => {
    this.setState({
      breed: e.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({
          animal: this.state.animal
        })
        .then(res => {
          if (
            res.petfinder &&
            res.petfinder.breeds &&
            Array.isArray(res.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: res.petfinder.breeds.breed
            });
          } else {
            this.setState({
              breeds: []
            });
          }
        });
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.handleLocationChange}
            type="text"
            id="location"
            placeholder="Enter a location"
            value={this.state.location}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
            id="animal"
          >
            <option />
            {ANIMALS.map(animal => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            disabled={this.state.breeds.length === 0}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
