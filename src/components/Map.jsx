import React from "react";
import Details from "./Details";

//Coding based on react-google-maps documentation https://tomchentw.github.io/react-google-maps/
const { compose, withStateHandlers, lifecycle } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");

const mapStyle = require("./data/Styles.json");

const Map = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
      error: null,
      errorInfo: null
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),

  lifecycle({
    componentDidMount() {
      // Handle Map Errors
      window.gm_authFailure = () => {
        alert("Error in loading google map");
        document.querySelector(
          ".gm-err-container"
        ).innerHTML = `<div class="error"><h1 class="error-message" aria label="message if map was not loaded properly">Sorry,there was an error on loading the map . Please try again later :) <h1/></div>`;
      };
    },
    //catch errors code from https://reactjs.org/docs/error-boundaries.html
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and log error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      });

      console.log(error, errorInfo);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultOptions={{ styles: mapStyle }}
    zoom={props.zoom}
    center={{ lat: props.lt, lng: props.lng }}
    //add title on map iframe for accessibility
    onTilesLoaded={() =>
      (document.querySelector("iframe").title = "Google map content")
    }
  >
    {props.places.map(place => (
      <Marker
        key={place.id}
        position={place.location}
        // bounce only the selected marker
        animation={place.id === props.activeMarker && props.isBounce ? 1 : -1}
        onClick={() => {
          props.toggleLocationsActive(
            place.location.lat,
            place.location.lng,
            place.id
          );
        }}
      >
        {/* //opens only one infowindow at a time */}
        {place.id === props.activeMarker && (
          <InfoWindow
            key={place.id}
            onCloseClick={() => {
              props.toggleBounceActive(props.isBounce);
              props.onToggleOpen();
            }}
          >
            <Details place={place} />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default Map;
