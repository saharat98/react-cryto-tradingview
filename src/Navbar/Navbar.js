import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className="Nav">
        <div className="Nav-item">
          <Link className="textStyle" to="/">
            Crypto Tradingview
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
