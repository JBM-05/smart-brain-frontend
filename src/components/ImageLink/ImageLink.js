import React from "react";
import "./ImageLink.css";

const ImageLink = ({ OnInputChange, OnButtonChange, id, updatingEntries }) => {
  const fetching = () => {
    fetch("https://smart-brain-api-9.onrender.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
       return updatingEntries(data);
      });
  };
  return (
    <div className="f3">
      <p className="white f3">
        This magic brain will detect the faces in your pictures,give it a try!
      </p>
      <div className="form center pa4 br3 shadow-5">
        <input
          className="f4 pa2 center w-70"
          type="text"
          onChange={OnInputChange}
        />
        <button
          className="w-30 bg-light-purple grow f4 link ph3 pv2 dib"
          onClick={() => {
            fetching();
          }}
        >
          Detect
        </button>
      </div>
    </div>
  );
};
export default ImageLink;
