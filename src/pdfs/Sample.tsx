import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import { useState, useEffect } from 'react';

const PdfGenerator = ({ studentName }) => {
  const [pdfTemplate, setPdfTemplate] = useState(null);

  useEffect(() => {
    fetch('/path/to/Acta_Defensa_Interna_de_Seminario_de_Grado_V1.1.pdf')
      .then(response => response.arrayBuffer())
      .then(buffer => setPdfTemplate(buffer));
  }, []);

  const handlePrint = () => {
    if (!pdfTemplate) return;

    const doc = new jsPDF();
    const pageCount = doc.internal.getNumberOfPages();

    // Load the template
    doc.addFileToVFS('template.pdf', pdfTemplate);
    doc.addPage('template.pdf');

    // Add custom data
    doc.setFontSize(12);
    doc.text(studentName, 50, 50); // Adjust coordinates accordingly
    // Add other custom text or images as needed

    // Save or print the PDF
    doc.save('customized_report.pdf');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Imprimir PDF
      </Button>
    </div>
  );
};

export default PdfGenerator;