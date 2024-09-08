import { useState } from 'react';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add'; 
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const EventByInterns = () => {
  const [editHoursOpen, setEditHoursOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "608555",
      semester: "Semestre I - 2024",
      events: [
        { name: "Evento A", status: "Participante" },
        { name: "Evento B", status: "Supervisor" }
      ]
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      semester: "Semestre II - 2024",
      events: [
        { name: "Evento C", status: "Participante" }
      ]
    }
  ]);

  const navigate = useNavigate();

  const handleEditHoursOpen = (id: number) => {
    setSelectedId(id);
    setEditHoursOpen(true);
  };
  
  const handleEditHoursClose = () => {
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const handleAddStudent = () => {
    navigate("/students"); 
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "semester",
      headerName: "Semestre",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Detalles",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleEditHoursOpen(params.row.id)}
        >
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddStudent}
        startIcon={<AddIcon />}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        Agregar Estudiante
      </Button>

      <Typography variant="h4" color="primary" style={{ marginBottom: '20px' }}>
        Becarios
      </Typography>
      
      <Select
        defaultValue="Semestre I - 2024"
        style={{ marginBottom: '20px' }}
        variant="standard"
      >
        <MenuItem value="Semestre I - 2024">Semestre I - 2024</MenuItem>
        <MenuItem value="Semestre II - 2024">Semestre II - 2024</MenuItem>
      </Select>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.id}
        />
      </div>

      <Dialog
        open={editHoursOpen}
        onClose={handleEditHoursClose}
        aria-labelledby="edit-hours-dialog-title"
        sx={{ '& .MuiDialog-paper': { width: '500px', maxWidth: '80%' } }}
      >
        <DialogTitle id="edit-hours-dialog-title">
          <Typography variant="h5" align="center" color="primary" style={{ fontWeight: 'bold' }}>
            Detalles del Becario
          </Typography>
        </DialogTitle>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleEditHoursClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedId && (
            <div>
              <Typography variant="h6" color="primary">
                {students.find((student) => student.id === selectedId)?.name}
              </Typography>
              <Typography variant="body1">
                Semestre: {students.find((student) => student.id === selectedId)?.semester}
              </Typography>
              <div>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Eventos:
                </Typography>
                {students.find((student) => student.id === selectedId)?.events.map((event, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Evento: {event.name}
                    </Typography>
                    <Typography variant="body1" style={{ color: event.status === "Supervisor" ? 'orange' : 'blue' }}>
                      Estado: {event.status}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditHoursClose}
            color="primary"
            variant="contained"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventByInterns;
