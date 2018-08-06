import React from "react";
// import { AttributeImg } from "./data/attributeLogo.png";

const Footer = props => {
  return (
    <footer role="contentinfo" id="footer">
      <h4 tabIndex={0}>
        Project Neighborhood Map.Powered by
        <b>
          <a
            href="https://developer.foursquare.com/"
            tabIndex={0}
            aria-label="Link to foursquare API site"
          >
            {" "}
            FOURSQUARE
          </a>
        </b>
        <span> and</span>
        <b>
          <a
            href="https://developers.google.com/maps/documentation/javascript/tutorial"
            tabIndex={0}
            aria-label="Link to google API documentation"
          >
            {" "}
            GOOGLE MAPS
          </a>
        </b>
      </h4>
    </footer>
  );
};

export default Footer;
