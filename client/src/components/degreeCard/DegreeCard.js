import React, { Component } from "react";
import "./DegreeCard.css";
import degreeImage1 from "./1.png"
import degreeImage2 from "./2.png"
import degreeImage3 from "./3.png"
import degreeImage4 from "./4.png"
import { Fade, Flip } from "react-reveal";

class DegreeCard extends Component {

 

  render() {
    const { degree, theme } = this.props;
    const degreeImages = {
      1: degreeImage1,
      2: degreeImage2,
      3: degreeImage3,
      4: degreeImage4,
    };
    return (
      <div className="degree-card">
        <Flip left duration={2000}>
          {/* <div className="card-img">
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: "scale(0.9)",
              }}
              src={degreeImage}
              // alt={degree.alt_name}
            />
          </div> */}
        </Flip>
        <Fade right duration={2000} distance="40px">
          <div className="card-body">
            <div
              className="body-header"
              style={{ backgroundColor: theme.headerColor }}
            >
               <div className="body-header-duration">
               
                <img src={degreeImages[degree.chronology]}></img>
              </div>
              <div className="body-header-title">
                <h2 className="card-title" style={{ color: theme.text ,fontFamily:theme.fontFamily}}>
                  {degree.title}
                </h2>
                <h3 className="card-subtitle" style={{ color: theme.text,fontFamily:theme.fontFamily }}>
                  {degree.subtitle}
                </h3>
              </div>
             
            </div>
            <div classname="body-content">
              {degree.descriptions.map((sentence) => {
                return (
                  <p className="content-list" style={{ color: theme.text,fontFamily:theme.fontFamily }}>
                    {sentence}
                  </p>
                );
              })}
              <a
                href={degree.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="visit-btn"
                  style={{ backgroundColor: theme.headerColor }}
                >
                  <span style={{ color: theme.text }}>Visit Website</span>
                  {/* <p className="btn" style={{ color: theme.text }}>
                    
                  </p> */}
                </div>
              </a>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default DegreeCard;


// const DegreeCardContainer = ({ degrees, theme }) => {
//   return (
//     <div className="degree-card-container">
//       {degrees.map((degree, index) => (
//         <DegreeCard key={index} degree={degree} theme={theme} />
//       ))}
//     </div>
//   );
// };

// export default DegreeCardContainer;
