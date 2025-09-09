import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ blob, className }) => {
  const blobUrl = URL.createObjectURL(blob);

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    >
      <div className={className}>
        <Viewer fileUrl={blobUrl} />
      </div>
    </Worker>
  );
};

export default PdfViewer;
