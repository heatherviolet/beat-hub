import React from "react";
import logo from "../assets/images/beatfoot3.png";


export default function Footer(albumData) {
  const year = new Date().getFullYear();

  return (
      <div className="footerMain d-flex justify-content-between">
        <div className="footerElement" id="BeetHub">
        <img 
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          BeetHub
        </div>
        <div>{year}</div>
      </div>
  );
}
