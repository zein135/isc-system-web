import { useFormik } from "formik";
import * as Yup from "yup";
import { ProfessorInterface } from "../../services/models/Professor";
import { createProfessor } from "../../services/mentorsService";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre completo es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Solo números son permitidos")
    .optional(),
  degree: Yup.string().required("El título académico es obligatorio"),
  code: Yup.number().optional(),
});

const CreateProfessorPage = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  
  const formik = useFormik<ProfessorInterface>({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      degree: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await createProfessor(values);
        setMessage('Profesor creado con éxito');
        setSeverity('success');
        setOpen(true);
      } catch (error) {
        setMessage('Error al crear el docente');
        setSeverity('error');
        setOpen(true);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  
  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h4">Crear Nuevo Docente</Typography>
            <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Ingrese los datos del docente a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={3}>
                <Typography variant="h6">Información del Docente</Typography>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Nombres"
                      variant="outlined"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="lastname"
                      name="lastname"
                      label="Apellido Paterno"
                      variant="outlined"
                      fullWidth
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
                      }
                      helperText={
                        formik.touched.lastname && formik.errors.lastname
                      }
                      margin="normal"
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="code"
                  name="code"
                  label="Codigo de Docente"
                  variant="outlined"
                  fullWidth
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                  margin="normal"
                />
                <TextField
                  id="degree"
                  name="degree"
                  label="Título Académico"
                  variant="outlined"
                  fullWidth
                  select
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  error={formik.touched.degree && Boolean(formik.errors.degree)}
                  helperText={formik.touched.degree && formik.errors.degree}
                  margin="normal"
                >
                  <MenuItem value="">Seleccione un título</MenuItem>
                  <MenuItem value="licenciado">Licenciado</MenuItem>
                  <MenuItem value="maestro">Maestro</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Divider flexItem sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={3}>
                <Typography variant="h6">Información Adicional</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="normal"
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Número de Teléfono"
                  variant="outlined"
                  fullWidth
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber && Boolean(formik.errors.phone)
                  }
                  helperText={formik.touched.phone && formik.errors.phone}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  GUARDAR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default CreateProfessorPage;
