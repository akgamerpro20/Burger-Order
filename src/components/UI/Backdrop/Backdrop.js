import React from "react";
import "./Backdrop.css";

const Backdrop = (props) =>
  props.showed ? <div className="Backdrop" onClick={props.clicked}></div> : null;

export default Backdrop;
