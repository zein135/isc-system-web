import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContainerPage from "../../components/common/ContainerPage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { events } from "../../data/events";
import dayjs from "dayjs";

const EventTable = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedEventName, setSelectedEventName] = useState<string>("");

  const columns: GridColDef[] = [
    {
      field: "startDate",
      headerName: "Fecha Inicio",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: (params: any) =>
        dayjs(params.row.startDate).format("DD/MM/YYYY"),
    },
    {
      field: "name",
      headerName: "Nombre del Evento",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "responsiblePerson",
      headerName: "Supervisor del Evento",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pendingInterns",
      headerName: "Solicitudes de Becarios",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "selectedInterns",
      headerName: "Becarios Seleccionados",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Typography
          onClick={() => handleView(params.row.id_event)}
          sx={{
            color: 'black',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => (
        <div>
          <IconButton
            color="default"
            aria-label="ver"
            sx={{ visibility: 'hidden' }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="default"
            aria-label="editar"
            sx={{ visibility: 'hidden' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="default"
            aria-label="eliminar"
            sx={{ visibility: 'hidden' }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  const handleView = (id: number) => {
    navigate(`/eventsByInterns/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/editEvent/${id}`);
  };

  const handleClickOpen = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedEventName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
    setSelectedEventName("");
  };

  const handleDelete = async () => {
    // TODO: add actual delete event logic
    setOpen(false);
  };

  return (
    <ContainerPage
      title="Lista de Eventos"
      subtitle="Resumen de los eventos programados y sus detalles"
      actions={
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateEvent}
          startIcon={<AddIcon />}
        >
          Agregar evento
        </Button>
      }
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={events}
          columns={columns}
          getRowId={(row) => row.id_event}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          classes={{
            root: "bg-white dark:bg-gray-800",
            columnHeader: "bg-gray-200 dark:bg-gray-800",
            cell: "bg-white dark:bg-gray-800",
            row: "bg-white dark:bg-gray-800",
            columnHeaderTitle: "!font-bold text-center",
          }}
          pageSizeOptions={[5, 10]}
        />
        <Dialog
          open={open}
          onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: '8px 16px' }}
          >
            <Typography sx={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
              Confirmar eliminación
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ padding: '16px' }}>
            <Typography variant="body1" align="center">
              ¿Estás seguro de eliminar el evento "{selectedEventName}"? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-end", padding: '8px 16px', gap: '8px' }}>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                minWidth: '80px',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: 'bold',
                minWidth: '80px',
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ContainerPage>
  );
};

export default EventTable;
