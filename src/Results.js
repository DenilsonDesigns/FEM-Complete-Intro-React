import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(res => {
        let pets;
        if (res.petfinder.pets && res.petfinder.pets.pet) {
          if (Array.isArray(res.petfinder.pets.pet)) {
            pets = res.petfinder.pets.pet;
          } else {
            pets = [res.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(el => {
          let breed;
          if (Array.isArray(el.breeds.breed)) {
            breed = el.breeds.breed.join(", ");
          } else {
            breed = el.breeds.breed;
          }
          return (
            <Pet
              id={el.id}
              key={el.id}
              breed={breed}
              name={el.name}
              animal={el.animal}
              media={el.media}
              location={`${el.contact.city}, ${el.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
