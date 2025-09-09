import PDFDocument from "pdfkit";
import fs from "fs";

function generateTemplate(data, res) {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=facture.pdf");

  doc.pipe(res);

  doc.text(`Client: ${data.title}`, { align: "left" });
  doc.text(`Total: ${data.body}`, { align: "left" });

  doc.end();
}

export default generateTemplate;
