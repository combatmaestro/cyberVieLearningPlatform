import React from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

const CustomPDFViewer = ({ file }) => {

  // const pdfData = `data:application/pdf;base64,${file}`;

  // return (
  //   <iframe
  //     src={pdfData}
  //     title="PDF Viewer"
  //     style={{ width: '100%', height: '700px', border: 'none' }}
  //   ></iframe>
  // );
  const pdfData = atob(file);

  const pdfDataArray = new Uint8Array(pdfData.length);
  for (let i = 0; i < pdfData.length; i++) {
    pdfDataArray[i] = pdfData.charCodeAt(i);
  }

  const pdfBlob = new Blob([pdfDataArray], { type: 'application/pdf' });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return (
    // <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}>
    //   <div style={{ height: '500px' }}>
    //     <Viewer fileUrl={pdfUrl} />
    //   </div>
    // </Worker>
    <embed
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0"`}
        title="PDF Viewer"
        style={{ width: '100%', height: '700px', border: 'none' }}
      />
  );
};

export default CustomPDFViewer;