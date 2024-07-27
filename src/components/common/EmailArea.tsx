import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { styled } from "@mui/system";
import { useCarrerStore } from "../../store/carrerStore";
import { sendEmail } from "../../services/emailService";

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 800,
  margin: "auto",
  marginTop: theme.spacing(5),
}));

const EmailSender = ({ seminar }) => {
  const carrer = useCarrerStore((state) => state.carrer);
  const defaultEmailContent = `
    <p><strong><u>ALUMNO 1</u></strong></p>
    <p><strong>Nombre:</strong> ${seminar.student_name}</p>
    <p><strong>Código:</strong> 56224</p>
    <p><strong>Celular:</strong> 78761916</p>
    <p><strong>Email:</strong> <a href="mailto:vargasmauricio65@gmail.com">vargasmauricio65@gmail.com</a></p>
    <p><strong>Modalidad:</strong> ${seminar.modality_name}</p>
  `;

  const [emailContent, setEmailContent] = useState(defaultEmailContent);
  const [subject, setSubject] = useState(`Revision de Carpeta - ${carrer?.shortName}`);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEmailContent(defaultEmailContent);
  }, [seminar]);

  const handleEmailContentChange = (content) => {
    setEmailContent(content);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    setError(null);

    try {
      const response = await sendEmail({
        email: seminar.email,
        subject,
        textHtml: emailContent,
      });

      if (!response.sucess) {
        throw new Error("Error al enviar el correo");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al enviar el correo");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Root>
      <TextField
        label="Asunto"
        variant="outlined"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <ReactQuill
        value={emailContent}
        onChange={handleEmailContentChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSendEmail}
        disabled={isSending}
      >
        {isSending ? "Enviando..." : "Enviar Correo"}
      </Button>
    </Root>
  );
};

export default EmailSender;
