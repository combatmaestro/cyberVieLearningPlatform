import React, { Component } from "react";
// import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";
// import TopButton from "../../components/topButton/TopButton";
import Educations from "./Educations";
// import Certifications from "../../containers/certifications/Certifications";
// import CompetitiveSites from "../../components/competitiveSites/CompetitiveSites";
import EducationImg from "./EducationImg";
// import { competitiveSites } from "../../../portfolio";
import "./EducationComponent.css";
import { Fade } from "react-reveal";
import { chosenTheme } from './../../../theme';
import Skills from "../skills/Skills";

class Education extends Component {
  render() {
    const theme = chosenTheme;
    return (
      <div className="education-main">
        {/* <Header theme={chosenTheme} /> */}
        <div className="basic-education">
          <Fade bottom duration={2000} distance="40px">
            <div className="heading-div">
            <div className="heading-text-div">
                <h1 className="heading-text" style={{ color: theme.text , fontFamily:theme.fontFamily}}>
                  Carrer in Cyber Security
                </h1>
                <h3 className="heading-sub-text" style={{ color: theme.text , fontFamily:theme.fontFamily}}>
                 KickStart with CyberVie
                </h3>
                
                {/* <CompetitiveSites logos={competitiveSites.competitiveSites} /> */}
              </div>
              <div className="heading-img-div">
                {/* <img
									src={require("../../assests/images/education.svg")}
									alt=""
								/> */}
                <EducationImg theme={theme} />
              </div>
              
            </div>
            <div>
              <Skills />
            </div>
          </Fade>
          <Educations theme={chosenTheme} />
          {/* <Certifications theme={chosenTheme} /> */}
        </div>
        {/* <Footer theme={chosenTheme} /> */}
        {/* <TopButton theme={chosenTheme} /> */}
      </div>
    );
  }
}

export default Education;
