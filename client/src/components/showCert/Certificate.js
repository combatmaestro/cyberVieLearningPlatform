import React, { useEffect, useState } from 'react';

const Certificate = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/certificate.html')
      .then((response) => response.text())
      .then((html) => setHtmlContent(html))
      .catch((err) => console.error('Error loading HTML:', err));
  }, []);

  return (
    <div className="certificate-container" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Certificate;
