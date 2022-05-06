import React from "react";
import "./Style/Homepage.css";
import Coinpage from "./Coinpage";
function Homepage() {
  return (
    <>
      <div className="bgHomepage">
        <div className="banner">
          <h1 className="textBanner">Crypto Tradingview</h1>
        </div>
      </div>
      <Coinpage />
    </>
  );
}

export default Homepage;
