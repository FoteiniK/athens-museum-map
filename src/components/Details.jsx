import React, { Component } from "react";

class Details extends Component {
  state = { imgUrl: [], errorFetch: "", isError: false };
  componentDidMount() {
    this.fetchImage();
  }

  //fetching image from foursquare for the selected place's location
  fetchImage = () => {
    let prefix, suffix, url;

    fetch(
      `https://api.foursquare.com/v2/venues/${
        this.props.place.id
      }/photos?limit=1&client_id=HZ21RK3NNBTL3ZOGAMSHFJRNDL1ZBPLW5HYRZTA1KWEASQBK&client_secret=DAADMNE0DYR1O4YGFFPX005YUZSNUJD1AQCWVB1OHGVRNG5N&v=20180803`
    )
      //dealing with fetching errors,code based on https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
      .then(response => {
        if (!response.ok) {
          //Setting an error message to be displayed if there is something wrong with response
          this.setState({
            isError: true,
            errorFetch:
              "Sorry,there was a problem while loading this place's image data from foursquare API.Check JavaScript developer console for more info"
          });
          throw response;
        }

        return response.json();
      })
      .then(data => {
        console.log(data.response);
        prefix = data.response.photos.items[0].prefix;
        suffix = data.response.photos.items[0].suffix;
        url = `${prefix}150x150${suffix}`;

        this.setState({
          imgUrl: url,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
        throw err;
      });
  };
  render() {
    const { place } = this.props;
    const { imgUrl, errorFetch, isError } = this.state;
    return (
      <div className="Details-info">
        <h4>{place.name}</h4>
        <img src={imgUrl} alt={place.name} />

        {/* //If there is an error on fetching data there will be this message displayed. */}
        {isError && <p className="error-message">{errorFetch}</p>}
        <p className="details-footer">
          <b>Address:</b>
          {place.location.address},{place.location.city}
        </p>
      </div>
    );
  }
}

export default Details;
