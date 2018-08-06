import React from "react";
import { Button } from "react-bootstrap";

const ListPlaces = props => {
  return (
    <div>
      <ol aria-label="Location List">
        {props.places.map(place => (
          <li key={place.id} tabIndex={props.isHidden ? "-1" : "0"}>
            <Button
              key={place.id}
              className="Button-location"
              onClick={() => {
                props.toggleLocationsActive(
                  place.location.lat,
                  place.location.lng,
                  place.id
                );
                props.checkViewport();
              }}
            >
              <span>{place.name}</span>
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListPlaces;
