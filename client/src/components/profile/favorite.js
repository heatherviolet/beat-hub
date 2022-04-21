import React from "react";

import { Link } from "react-router-dom";

export default function Favorite({ favorite }) {
  return (
    <Link to={`/album/${favorite.albumId}`}>
      <div className="favorites">
        <img className="favorite-image" src={favorite.cover} style={{ padding: "5px", width: '200px', height: '200px'}} />
      </div>
    </Link>
  );
}
