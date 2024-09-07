import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
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
      hours: 10,
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      time: "08:49",
      status: "Aceptado",
      hours: 20,
    },
  ]);
  
  const navigate = useNavigate(); 
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
        student.id === selectedId ? { ...student, hours: Number(newHours) } : student
      )
    );
    handleEditHoursClose();
  };

  const handleEditHoursOpen = (id: number, currentHours: string) => {
    setSelectedId(id);
    setNewHours(currentHours);
    setEditHoursOpen(true);
  };
  
  const handleEditHoursClose = (event?: object, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    setEditHoursOpen(false);
    setSelectedId(null);
  };

  const handleAddStudent = () => {
    navigate("/students"); 
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
      headerName: "Aceptado/Rechazado",
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
          <MenuItem value="Aceptado">Aceptado</MenuItem>
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
      renderCell: (params) => `${params.value} horas`,
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
    <div style={{ position: 'relative', height: '100vh', padding: '19px' }}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: 'absolute',
          top: '17px',
          left: '-9px',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddStudent}
        startIcon={<AddIcon />}
        style={{
          position: 'absolute',
          top: '29px',
          right: '39px',
          zIndex: 1
        }}
      >
        Agregar Estudiante
      </Button>
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
              sx={{ '& .MuiDialog-paper': { width: '500px', maxWidth: '80%' } }}
            >
              <DialogTitle id="edit-hours-dialog-title" sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Editar Horas Becarias
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: 'left', mt: 1 }}>
                  {students.find((student) => student.id === selectedId)?.name}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <IconButton
                  aria-label="close"
                  onClick={handleEditHoursClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[800],
                    padding: '7px'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <TextField
                  fullWidth
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  label="Horas Becarias"
                  type="number" 
                  margin="dense"
                />
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'flex-end', padding: '24px' }}>
                <Button
                  onClick={handleEditHoursClose}
                  sx={{color: 'white', backgroundColor: 'primary', '&:hover': {backgroundColor: 'darkblue'},fontWeight: 'bold', marginRight: 2}}
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleHoursSave}
                  sx={{color: 'white', backgroundColor: 'red', '&:hover': {backgroundColor: 'darkred'},fontWeight: 'bold'}}
                  variant="contained"
                >
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