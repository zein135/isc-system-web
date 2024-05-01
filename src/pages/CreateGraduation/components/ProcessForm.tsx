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
            <Typography variant="h6">Informacion Estudiante</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              select
              label="Country"
              value=""
              onChange={() => {}}
              variant="outlined"
            >
              <MenuItem value="Estonia">Estonia</MenuItem>
            </TextField>
            <TextField fullWidth my-5 label="Last name" variant="outlined" />
          </Grid>
        </Grid>
        <Divider flexItem sx={{ my: 2 }} />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6">Informacion Modalidad</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField fullWidth my-5 label="Last name" variant="outlined" />
            <TextField fullWidth my-5 label="Last name" variant="outlined" />
            <TextField fullWidth my-5 label="Last name" variant="outlined" />
          </Grid>
        </Grid>
        <Divider flexItem sx={{ my: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Update details
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProcessForm;
