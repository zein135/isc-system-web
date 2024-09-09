import { useState } from 'react';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
      semester: "6",
      events: [
        { name: "Seminario de Innovación Tecnológica", status: "Participante" },
        { name: "Curso de Gestión de Proyectos", status: "Supervisor" }
      ]
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      semester: "8",
      events: [
        { name: "Curso de Gestión de Proyectos", status: "Participante" }
      ]
    }
  ]);

  const handleEditHoursOpen = (id: number) => {
    setSelectedId(id);
    setEditHoursOpen(true);
  };
  
  const handleEditHoursClose = () => {
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      headerAlign: "left",
      align: "left",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "name",
      headerName: "Nombre",
      headerAlign: "left",
      align: "left",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "semester",
      headerName: "Semestre",
      headerAlign: "left",
      align: "left",
      flex: 1,
      headerClassName: 'headerStyle',
      cellClassName: 'cellStyle',
    },
    {
      field: "eventsCount",
      headerName: "Eventos",
      headerAlign: "left",
      align: "left",
      flex: 1,
      headerClassName: 'headerStyle',
      renderCell: (params) => (
        <Button onClick={() => handleEditHoursOpen(params.row.id)}>
          {params.row.events.length}
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

      <Typography variant="h4" color="primary" style={{ marginBottom: '20px' }}>
        Becarios
      </Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.id}
          sx={{
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#d3d3d3" },
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle": {
              color: "#000", 
              fontWeight: "bold", 
            },
          }}
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
              <table style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Evento</th>
                    <th style={{ textAlign: 'left' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {students.find((student) => student.id === selectedId)?.events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.name}</td>
                      <td style={{ color: event.status === "Supervisor" ? 'orange' : 'blue' }}>
                        {event.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
