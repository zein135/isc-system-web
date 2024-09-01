import { Button, IconButton, TextField, Dialog, DialogActions, DialogTitle, DialogContent, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import dayjs from "dayjs";
import { EventDetails } from "../../models/eventInterface";
import EventDetailsPage from "../../components/common/EventDetailsPage";

const InternsListPage = () => {
  const [editHoursOpen, setEditHoursOpen] = useState(false);
  const [newHours, setNewHours] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "608555",
      time: "22:23",
      status: "Rechazado",
      hours: "4 horas",
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      time: "08:49",
      status: "Seleccionado",
      hours: "4 horas",
    },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleHoursSave = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedId ? { ...student, hours: newHours } : student
      )
    );
    handleEditHoursClose();
  };

  const handleEditHoursOpen = (id: number, currentHours: string) => {
    setSelectedId(id);
    setNewHours(currentHours);
    setEditHoursOpen(true);
  };

  const handleEditHoursClose = () => {
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del becario/a",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Código",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Hora de registro",
      type: "string",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Seleccionado/Rechazado",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Select
          fullWidth
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          variant="standard" 
          sx={{
            minHeight: 0, 
            lineHeight: 1.5,  
            padding: '2px 8px',  
            '& .MuiSelect-select': {
              padding: 0,  
            },
            '& .MuiInputBase-root': {
              margin: 0,  
            }
          }}
        >
          <MenuItem value="Seleccionado">Seleccionado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
          <MenuItem value="Suplente">Suplente</MenuItem>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
        </Select>
      ),
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Editar",
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleEditHoursOpen(params.row.id, params.row.hours)}
        >
          Editar
        </Button>
      ),
    },
  ];

  const eventDetails: EventDetails = {
    title: "Evento de 100 mejores",
    date: dayjs("2024-07-01T10:00:00Z"),
    endDate: dayjs("2024-07-01T10:00:00Z"),
    duration: 6,
    scholarshipHours: "4 horas",
    location: "Centro de Eventos, Campus Achocalla",
    maxParticipants: 30,
    minParticipants: 5,
    responsiblePerson: "Juan",
    description:
      "Se necesitan becarios que ayuden en la logística del evento donde se recibirá a los estudiantes ganadores de la beca 100 mejores.",
    status: "PENDIENTE",
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: 'absolute',
          top: '23px',
          left: '16px',
          zIndex: 1
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <EventDetailsPage
        event={eventDetails}
        children={
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={students}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              classes={{
                root: "bg-white dark:bg-gray-800",
                columnHeader: "bg-gray-200 dark:bg-gray-800 ",
                cell: "bg-white dark:bg-gray-800",
                row: "bg-white dark:bg-gray-800",
                columnHeaderTitle: "!font-bold text-center",
              }}
              pageSizeOptions={[5, 10]}
            />

            <Dialog
              open={editHoursOpen}
              onClose={handleEditHoursClose}
              aria-labelledby="edit-hours-dialog-title"
            >
              <DialogTitle id="edit-hours-dialog-title">
                Editar Horas Becarias de{" "}
                {students.find((student) => student.id === selectedId)?.name}
              </DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  label="Horas Becarias"
                  type="text"
                  margin="dense"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditHoursClose} color="secondary">
                  Cancelar
                </Button>
                <Button onClick={handleHoursSave} color="primary">
                  Guardar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      />
    </div>
  );
};

export default InternsListPage;
