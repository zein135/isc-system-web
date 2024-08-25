import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContainerPage from "../../components/common/ContainerPage";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { events } from "../../data/events";
import dayjs from "dayjs";

const EventTable = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    {
      field: "startDate",
      headerName: "Fecha Inicio",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // TODO: change any to an interface 
      valueGetter: (params: any) =>
        dayjs(params.startDate).format("DD/MM/YYYY"),
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
      headerName: "Supervisor del evento",
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
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="ver"
            onClick={() => handleView(params.row.id_event)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="editar"
            onClick={() => handleEdit(params.row.id_event)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="eliminar"
            onClick={() => handleClickOpen(params.row.id_event)}
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
    // TODO: use id to show proper event details
    navigate(`/interns`);
  };

  const handleEdit = (id: string) => {
    navigate(`/editEvent/${id}`);
  };

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    // TODO: Add delete event logic
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
            columnHeader: "bg-gray-200 dark:bg-gray-800 ",
            cell: "bg-white dark:bg-gray-800",
            row: "bg-white dark:bg-gray-800",
            columnHeaderTitle: "!font-bold text-center",
          }}
          pageSizeOptions={[5, 10]}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmar eliminación"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás seguro de que deseas eliminar este evento? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ContainerPage>
  );
};

export default EventTable;
