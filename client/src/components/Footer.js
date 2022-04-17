import React from "react";

export default function Footer(albumData) {
  const year = new Date().getFullYear();

  return (
      <div className="footerMain d-flex justify-content-between">
        <div className="footerElement" id="BeetHub">
          BeetHub
        </div>
        <div>{year}</div>
      </div>
  );
}
