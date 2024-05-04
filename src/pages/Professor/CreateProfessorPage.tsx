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
} from "@mui/material";

const validationSchema = Yup.object({
  fullName: Yup.string().required("El nombre completo es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Solo números son permitidos")
    .optional(),
  academicTitle: Yup.string().required("El título académico es obligatorio"),
  employeeNumber: Yup.string().optional(),
});

const CreateProfessorPage = () => {
  const formik = useFormik<ProfessorInterface>({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      academicTitle: "",
      employeeNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await createProfessor(values);
      } catch (error) {
        console.error("Error al crear el docente:", error);
      }
    },
  });
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
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Nombre Completo"
                  variant="outlined"
                  fullWidth
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  margin="normal"
                />

                <TextField
                  id="employeeNumber"
                  name="employeeNumber"
                  label="Codigo de Docente"
                  variant="outlined"
                  fullWidth
                  value={formik.values.employeeNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.employeeNumber &&
                    Boolean(formik.errors.employeeNumber)
                  }
                  helperText={
                    formik.touched.employeeNumber &&
                    formik.errors.employeeNumber
                  }
                  margin="normal"
                />
                <TextField
                  id="academicTitle"
                  name="academicTitle"
                  label="Título Académico"
                  variant="outlined"
                  fullWidth
                  select
                  value={formik.values.academicTitle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.academicTitle &&
                    Boolean(formik.errors.academicTitle)
                  }
                  helperText={
                    formik.touched.academicTitle && formik.errors.academicTitle
                  }
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
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Número de Teléfono"
                  variant="outlined"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
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
    </FormContainer>
  );
};

export default CreateProfessorPage;
