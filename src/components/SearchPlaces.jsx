import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";

class SearchPlaces extends Component {
  render() {
    const { query } = this.props;
    return (
      <div className="search-places" id="search">
        <DebounceInput
          aria-label="Search place by name"
          minLength={1}
          debounceTimeout={300}
          type="text"
          placeholder="Search places"
          value={query}
          onChange={event => this.props.updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchPlaces;
