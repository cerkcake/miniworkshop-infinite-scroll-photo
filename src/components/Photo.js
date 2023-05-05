import React from "react";
import "../App.css";

const Photo = ({ alt_description, urls: { regular } }) => {
  return (
    <div className="songle-photo">
      <img src={regular} alt={alt_description} />
    </div>
  );
};

export default Photo;
