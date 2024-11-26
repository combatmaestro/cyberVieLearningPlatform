import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Certificate = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    fetch('/certificate.html')
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        if (doc) {
          // Ensure user data is defined
          if (user && user.data) {
        const date = new Date(user.data.certificateDate);
        const formattedDate = date.toISOString().split('T')[0];
            doc.getElementById('studentName') && 
            (doc.getElementById('studentName').textContent = user.data.name || 'Student Name');
          
          doc.getElementById('referenceId') && 
            (doc.getElementById('referenceId').textContent = user.data.certificateRefId || 'Reference ID');
          
          doc.getElementById('dateOfIssue') && 
            (doc.getElementById('dateOfIssue').textContent = formattedDate || 'Date of Issue');
          
          } else {
            console.error('User data is not defined or missing required fields.');
          }
        } else {
          console.error('Parsed document is null. Check your HTML content.');
        }

        // Serialize the updated HTML back to a string
        const updatedHtml = doc.documentElement.innerHTML;
        setHtmlContent(updatedHtml);
      })
      .catch((err) => console.error('Error loading HTML:', err));
  }, []);

  return (
    <div className="certificate-container" style={{
      marginLeft: '20%',
      width: '60%',
      padding: '1%',
      border: '2px solid gray',
      marginTop: '1%'
    }}  dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Certificate;
