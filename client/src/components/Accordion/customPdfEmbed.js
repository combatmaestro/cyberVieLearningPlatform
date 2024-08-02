import React from 'react';

const CustomPDFViewer = ({ file }) => {


  return (
    <embed
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0"`}
        title="PDF Viewer"
        style={{ width: '100%', height: '700px', border: 'none' }}
      />
  );
};

export default CustomPDFViewer;