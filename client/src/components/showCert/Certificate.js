import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch("/certificate.html");
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        if (doc.readyState === "complete") {
          if (user && user.data) {
            const date = new Date(user.data.certificateDate);
            const formattedDate = date.toISOString().split("T")[0];

            const studentNameElement = doc.getElementById("studentName");
            const referenceIdElement = doc.getElementById("referenceId");
            const dateOfIssueElement = doc.getElementById("dateOfIssue");

            if (studentNameElement) {
              studentNameElement.innerText = user.data.name || "Student Name";
            }

            if (referenceIdElement) {
              referenceIdElement.innerText = user.data.certificateRefId || "Reference ID";
            }

            if (dateOfIssueElement) {
              dateOfIssueElement.innerText = formattedDate || "Date of Issue";
            }

            // Serialize the updated HTML back to a string
            const updatedHtml = doc.documentElement.outerHTML;
            setHtmlContent(updatedHtml);
          } else {
            console.error("User data is not defined or missing required fields.");
          }
        } else {
          console.error("Parsed document is null. Check your HTML content.");
        }
      } catch (err) {
        console.error("Error loading HTML:", err);
      }
    };

    fetchHtml();
  }, [user]);


const downloadCertificate = () => {
  const certificateContainer = document.querySelector(".certificate-container");

  if (!certificateContainer) {
    console.error("Certificate container not found!");
    return;
  }

  html2canvas(certificateContainer, {
    scale: 2, // Higher scale for better quality
    useCORS: true, // Enable cross-origin resources
    backgroundColor: null, // Retain transparency
    windowWidth: certificateContainer.scrollWidth, // Match container width
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);

    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("certificate.pdf");
  }).catch((error) => {
    console.error("Error generating PDF:", error);
  });
};

  

  return (
    <div style={{ textAlign: "center" }}>
      {/* Download Button */}
      <button
        onClick={downloadCertificate}
        style={{
          padding: "10px 20px",
          margin: "10px 0",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Certificate
      </button>

      {/* Certificate Display */}
      <div
        className="certificate-container"
        style={{
          // marginLeft: "10%",
          width: "100%",
          height:"100%",
          padding: "1%",
          // border: "2px solid gray",
          marginTop: "1%",
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default Certificate;
