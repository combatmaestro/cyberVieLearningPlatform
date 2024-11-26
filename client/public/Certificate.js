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
        const date = new Date(user.certificateDate);
        const formattedDate = date.toISOString().split('T')[0];
        // Example: Update fields using their IDs
        doc.getElementById('studentName')?.textContent = user.name;
        doc.getElementById('referenceId')?.textContent = '2024-11-26';
        doc.getElementById('dateOfIssue')?.textContent = formattedDate;

        // Serialize the updated HTML back to a string
        const updatedHtml = doc.documentElement.innerHTML;

        setHtmlContent(updatedHtml);
      })
      .catch((err) => console.error('Error loading HTML:', err));
  }, []);

  return (
    <div className="certificate-container" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Certificate;
