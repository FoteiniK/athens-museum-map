import React from "react";
import { Button, Glyphicon } from "react-bootstrap";

const Header = props => {
  const searchFilter = document.getElementById("search");
  const listPlaces = document.getElementById("list");
  const map = document.getElementById("map-container");
  return (
    <header className="App-header" role="banner" tabIndex="0">
      <Button
        //toggle hiding side menu
        onClick={() => {
          searchFilter.classList.toggle("hide");

          listPlaces.classList.toggle("hide");
          map.classList.toggle("full-width");
          props.isHidden();
        }}
        aria-label="Toggle Side Menu"
      >
        <Glyphicon glyph="menu-hamburger" />
      </Button>
      <h1>Welcome to Athens!</h1>
    </header>
  );
};

export default Header;
