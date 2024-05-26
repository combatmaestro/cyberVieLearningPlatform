import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { Fade } from "react-reveal";
import { chosenTheme } from "../../../theme";

export default function Skills(props) {
  const theme = chosenTheme;
  return (
    <div className="main" id="skills">
      {/* <div className="skills-header-div">
        <Fade bottom duration={2000} distance="20px">
          <div className="skills-header" style={{ color: theme.text }}>
             <h3>How To Kickstart your </h3>
            
             <h1>Career in Cyber Security</h1>
          </div>
        </Fade>
      </div> */}
      <SkillSection theme={theme} />
    </div>
  );
}
