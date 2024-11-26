import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Certificate = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch('/certificate.html');
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        if (doc) {
          // Ensure user data is defined
          if (user && user.data) {
            const date = new Date(user.data.certificateDate);
            const formattedDate = date.toISOString().split('T')[0];

            const studentNameElement = doc.getElementById('studentName');
            const referenceIdElement = doc.getElementById('referenceId');
            const dateOfIssueElement = doc.getElementById('dateOfIssue');

            if (studentNameElement) {
              studentNameElement.textContent = user.data.name || 'Student Name';
              console.log('Updated studentName:', studentNameElement.textContent);
            } else {
              console.error('Element with ID "studentName" not found.');
            }

            if (referenceIdElement) {
              referenceIdElement.textContent = user.data.certificateRefId || 'Reference ID';
              console.log('Updated referenceId:', referenceIdElement.textContent);
            } else {
              console.error('Element with ID "referenceId" not found.');
            }

            if (dateOfIssueElement) {
              dateOfIssueElement.textContent = formattedDate || 'Date of Issue';
              console.log('Updated dateOfIssue:', dateOfIssueElement.textContent);
            } else {
              console.error('Element with ID "dateOfIssue" not found.');
            }

            // Serialize the updated HTML back to a string
            const updatedHtml = doc.documentElement.outerHTML;
            setHtmlContent(updatedHtml);
          } else {
            console.error('User data is not defined or missing required fields.');
          }
        } else {
          console.error('Parsed document is null. Check your HTML content.');
        }
      } catch (err) {
        console.error('Error loading HTML:', err);
      }
    };

    fetchHtml();
  }, [user]);

  return (
    <div
      className="certificate-container"
      style={{
        marginLeft: '10%',
        width: '80%',
        padding: '1%',
        border: '2px solid gray',
        marginTop: '1%',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default Certificate;
