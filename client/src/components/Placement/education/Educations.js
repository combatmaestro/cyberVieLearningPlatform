import React, { Component } from "react";
import "./Educations.css";
import DegreeCard from "../../degreeCard/DegreeCard";
import { degrees } from "../../../portfolio";
import { Fade } from "react-reveal";
import { chosenTheme } from "../../../theme";

class Educations extends Component {
  render() {
    const theme = chosenTheme;
    return (
      <div className="main" id="educations">
        <div className="educations-header-div">
          <Fade bottom duration={2000} distance="20px">
            <h1 className="educations-header" style={{ color: theme.text ,fontFamily:theme.fontFamily }}>
              4Es of a Bright Future
            </h1>
          </Fade>
        </div>
        <div className="educations-body-div">
        <div className="degree-card-container">
          {degrees.degrees.map((degree) => {
            return <DegreeCard degree={degree} theme={theme} />;
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default Educations;
