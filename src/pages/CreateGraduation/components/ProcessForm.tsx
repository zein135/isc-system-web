import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";

import Divider from "@mui/material/Divider";

function ProcessForm() {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Crear Proceso de Graduación</Typography>
        <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
          Completa los siguientes campos para definir los criterios y requisitos
          del proceso de graduación.
        </Typography>
        <Divider flexItem sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body2">Informacion Estudiante</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              select
              label="Nombre Estudiante"
              value=""
              onChange={() => {}}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="Estonia">Paul Landaeta</MenuItem>
            </TextField>
            <TextField
              fullWidth
              my-5
              label="Código Estudiante"
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Divider flexItem sx={{ my: 2 }} />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body2">Informacion Modalidad</Typography>
          </Grid>
          <Grid item xs={9}>
          <TextField
              fullWidth
              select
              label="Seleccionar Modalidad"
              value=""
              onChange={() => {}}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="1">Trabajo Dirigido</MenuItem>
              <MenuItem value="2">Proyecto de Grado</MenuItem>
              <MenuItem value="3">Tesis</MenuItem>
            </TextField>
            <TextField
              fullWidth
              my-5
              label="Titulo de Proyecto"
              variant="outlined"
              margin="normal"
            />
             <TextField
              fullWidth
              select
              label="Seleccionar Periodo"
              value=""
              onChange={() => {}}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="1">Segundo 2024</MenuItem>
              <MenuItem value="2">Primero 2025</MenuItem>
              <MenuItem value="3">Segundo 2025</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Divider flexItem sx={{ my: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary">
              GUARDAR
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProcessForm;
