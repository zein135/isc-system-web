import  { useState } from "react";
import { EventDetails } from "../../models/eventInterface.ts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FormContainer } from "../../pages/CreateGraduation/components/FormContainer.tsx";
import LoadingOverlay from "../../components/common/Loading.tsx";
import { Typography, Grid, TextField, Button, Divider } from "@mui/material";
import ErrorDialog from "../../components/common/ErrorDialog.tsx";
import SuccessDialog from "../../components/common/SucessDialog.tsx";
import { useNavigate } from "react-router-dom";



const validationSchema = Yup.object({
  title: Yup.string().required("El nombre del evento es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  location: Yup.string().required("La ubicacion es obligatorio"),
  date: Yup.date().required("La fecha es obligatoria"),
  endDate: Yup.date().required("La fecha de finalización es obligatoria"),
  duration: Yup.number()
    .required("La duración es obligatoria")
    .min(1, "La duracion minima es de 1"),
  scholarshipHours: Yup.string().required("Las horas becarias son obligatorias"),
  maxParticipants: Yup.number()
    .required("El número de becarios es obligatorio")
    .min(1, "Debe haber al menos un becario"),
  minParticipants: Yup.number()
    .required("La cantidad mínima de becarios es obligatoria")
    .min(1, "Debe haber al menos 1 becario"),
  
  responsiblePerson: Yup.string().required("El nombre del responsable es obligatorio"),
});

const CreateForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const sucessDialogClose = () => {
    setSuccessDialog(false);
    formik.resetForm();
  };

  const errorDialogClose = () => {
    setErrorDialog(false);
  };

  const handleCancel = () => {
    formik.resetForm();
    navigate("/events"); 
  };

  const formik = useFormik<EventDetails>({
    initialValues: {
      title: "",
      date: "",
      endDate: "",
      duration: 0,
      scholarshipHours: "",
      location: "",
      maxParticipants: 0,
      minParticipants: 0,
      description: "",
      responsiblePerson: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Formulario enviado:", values);
      setLoading(true);
      try {
        formik.resetForm();
        navigate("/events"); 
        setMessage("Evento actualizado con éxito");
        setSuccessDialog(true);
      } catch (error) {
        setMessage("Error al actualizar el evento");
        setErrorDialog(true);
      } finally {
        setLoading(false);
      }
    },
  });


  return (
    <FormContainer>
      {loading && <LoadingOverlay message="Creando Evento..." />}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4">Crear Nuevo Evento</Typography>
            <Typography 
            margin="normal"
            variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Ingrese los datos del evento a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>


          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Información del Evento</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid item xs={9}>
                  <TextField
                      id="title"
                      name="title"
                      label="Nombre del evento"
                      variant="outlined"
                      fullWidth
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                      margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descripción del evento"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="location"
                    name="location"
                    label="Ubicación"
                    variant="outlined"
                    fullWidth
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                    margin="normal"
                  />
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="date"
                      name="date"
                      label="Fecha de inicio"
                      type="date"
                      margin = "normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="endDate"
                      name="endDate"
                      label="Fecha de finalización"
                      type="date"
                      variant="outlined"
                      fullWidth
                      margin = "normal"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      error={formik.touched.endDate && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="duration"
                    name="duration"
                    label="Duración (horas)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                  />
                </Grid>
              </Grid>

            </Grid>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>
        
          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Becarios</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      id="scholarshipHours"
                      name="scholarshipHours"
                      label="Horas Becarias"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.scholarshipHours}
                      onChange={formik.handleChange}
                      error={formik.touched.scholarshipHours && Boolean(formik.errors.scholarshipHours)}
                      helperText={formik.touched.scholarshipHours && formik.errors.scholarshipHours}
                    />
                  </Grid>
                  
                  <Grid item xs={3}>
                    <TextField
                      id="minParticipants"
                      name="minParticipants"
                      label="N° Mínimo de Becarios"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.minParticipants}
                      onChange={formik.handleChange}
                      error={formik.touched.minParticipants && Boolean(formik.errors.minParticipants)}
                      helperText={formik.touched.minParticipants && formik.errors.minParticipants}
                    />  
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      id="maxParticipants"
                      name="maxParticipants"
                      label="N° Máximo de Becarios"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={formik.values.maxParticipants}
                      onChange={formik.handleChange}
                      error={formik.touched.maxParticipants && Boolean(formik.errors.maxParticipants)}
                      helperText={formik.touched.maxParticipants && formik.errors.maxParticipants}
                    />  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} >
            <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={3}>
                <Typography variant="h6" >Encargado</Typography>
              </Grid>
              <Grid item xs={9}>
              <TextField
                id="responsiblePerson"
                name="responsiblePerson"
                label="Encargado"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.responsiblePerson}
                onChange={formik.handleChange}
                error={formik.touched.responsiblePerson && Boolean(formik.errors.responsiblePerson)}
                helperText={formik.touched.responsiblePerson && formik.errors.responsiblePerson}
              />
              </Grid>

            </Grid>
          </Grid>    
        </Grid>



        
        <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: "20px" }}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Crear
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
      <SuccessDialog
        open={successDialog}
        onClose={sucessDialogClose}
        title={"Evento Creado!"}
        subtitle={"El evento ha sido creado con éxito."}
      />
      <ErrorDialog
        open={errorDialog}
        onClose={errorDialogClose}
        title={"¡Vaya!"}
        subtitle={message}
      />
    </FormContainer>
  );
};

export default CreateForm;