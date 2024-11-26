import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const Certificate = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    fetch('/certificate.html')
      .then((response) => response.text())
      .then((html) => {
        // Update specific fields dynamically
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const date = new Date(user?.certificateDate);
        const formattedDate = date.toISOString().split('T')[0];
        // Example: Update fields using their IDs
        doc.getElementById('studentName')?.textContent = user?.name;
        doc.getElementById('referenceId')?.textContent = user?.certificateRefId;
        doc.getElementById('dateOfIssue')?.textContent = formattedDate;

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
