import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ListPlaces from "./components/ListPlaces";
import Footer from "./components/Footer";
import SearhPlaces from "./components/SearchPlaces";
import escapeRegExp from "escape-string-regexp";

import Map from "./components/Map";

class App extends Component {
  state = {
    places: [],
    zoom: 14,
    latitude: 37.98381,
    longitude: 23.727539,
    activeMarker: null,
    isBounce: false,
    query: "",
    showingPlaces: [],
    isHidden: false,
    errorFetch: "",
    isError: false
  };

  componentDidMount() {
    this.fetchPlaces();
  }

  //fetching data for places from foursquare API
  fetchPlaces = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${this.state.latitude},${
        this.state.longitude
      }&intent=browse&radius=10000&query=museum&client_id=HZ21RK3NNBTL3ZOGAMSHFJRNDL1ZBPLW5HYRZTA1KWEASQBK&client_secret=DAADMNE0DYR1O4YGFFPX005YUZSNUJD1AQCWVB1OHGVRNG5N&v=20180708`
    )
      .then(response => {
        //dealing with fetching errors,code based on
        // https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
        if (!response.ok) {
          //Setting an error message to be displayed if there is something wrong with response
          this.setState({
            isError: true,
            errorFetch:
              "Sorry,there was a problem while loading the locations' data from foursquare API.Please try again later.Check JavaScript developer console for more info."
          });
          throw response;
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          places: data.response.venues,
          showingPlaces: data.response.venues
        });
      })
      .catch(err => {
        throw err;
      });
  };

  //changes tab-index attribute on list items depending
  //on if the list is hidden or not
  isHidden = () => this.setState({ isHidden: !this.state.isHidden });

  /*common method for marker and list-item click for 
   *choosing marker and open info-window */
  toggleLocationsActive = (lat, lng, marker) => {
    this.setState({
      zoom: 16,
      latitude: lat,
      longitude: lng,
      activeMarker: marker,
      isBounce: true
    });
  };

  //resets active marker's bouncing state
  toggleBounceActive = marker => {
    this.setState({
      activeMarker: marker,
      isBounce: false
    });
  };

  //hides side menu on list item click if the device viewport is small
  checkViewport = () => {
    const searchFilter = document.getElementById("search");
    const listPlaces = document.getElementById("list");
    const map = document.getElementById("map-container");
    if (window.screen.width <= 450) {
      searchFilter.classList.toggle("hide");
      listPlaces.classList.toggle("hide");
      map.classList.toggle("full-width");
    }
  };

  //filter results depending on inserted text
  //and zoom if there is only one result
  updateQuery = query => {
    this.setState({ query });

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      let showingPlaces = this.state.places.filter(place =>
        match.test(place.name)
      );
      if (query.length === 0) {
        this.setState({ showingPlaces: this.state.places, zoom: 14 });
      } else {
        this.setState({ showingPlaces, zoom: 14 });

        if (showingPlaces.length === 1) {
          this.toggleLocationsActive(
            this.state.showingPlaces[0].location.lat,
            this.state.showingPlaces[0].location.lng
          );
        }
      }
    } else {
      this.setState({
        showingPlaces: this.state.places,
        zoom: 14
      });
    }
  };
  render() {
    const {
      showingPlaces,
      zoom,
      latitude,
      longitude,
      activeMarker,
      animation,
      isBounce,
      isHidden,
      isError,
      errorFetch
    } = this.state;

    return (
      <div className="App">
        <Header isHidden={this.isHidden} />
        <div className="side-bar">
          <SearhPlaces updateQuery={this.updateQuery} />
          <div className="List" id="list">
            <ListPlaces
              isHidden={isHidden}
              places={showingPlaces}
              activeMarker={activeMarker}
              toggleLocationsActive={this.toggleLocationsActive}
              checkViewport={this.checkViewport}
            />
          </div>
        </div>

        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXl9uRSgzxIqV4ltDq0Z7hctJ4j1Hg9K8&v=3.exp&libraries=geometry,drawing,places"
          places={showingPlaces}
          lt={latitude}
          lng={longitude}
          zoom={zoom}
          containerElement={
            <div
              id="map-container"
              className="map-area"
              role="application"
              tabIndex="0"
              aria-label="map with locations"
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          animation={animation}
          activeMarker={activeMarker}
          toggleLocationsActive={this.toggleLocationsActive}
          isBounce={isBounce}
          toggleBounceActive={this.toggleBounceActive}
        />

        <Footer />
        {isError && <h1 className="error-message-main">{errorFetch}</h1>}
      </div>
    );
  }
}

export default App;
