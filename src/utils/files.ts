import { saveAs } from "file-saver";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export const downloadFile = async (file: Blob, fileName: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
};

export const loadFile = async (url: string) => {
  try {
    console.log("Loading file:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error("Error loading file:", error);
    throw error;
  }
};

export const generateDocument = async (url: string, data, fileName: string) => {
  // "/src/pdfs/carta_tutor.docx"
  const content = await loadFile(url); 
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Reemplazar los marcadores de posición con los datos reales
  // doc.setData({
  //   student: "Carlos Michael Velarde Kubber",
  //   tutor: "Ing. Franz Eduardo Mercado Lorberg2222222",
  //   jefe_carrera: "Alexis Marechal Marin PhD",
  //   carrera: "Ingeniería de Sistemas Computacionales",
  //   dia: "29",
  //   mes: "Septiembre",
  //   ano: "2024",
  // });
  doc.setData(data);

  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }

  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  saveAs(out, fileName);
};
