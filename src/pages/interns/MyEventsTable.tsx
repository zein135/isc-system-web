import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { events } from "../../data/events";
import ContainerPage from "../../components/common/ContainerPage";


const MyEventsTable = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/scholarshipHours");
  };

const [isDeleted, setIsDeleted] = useState(false);
  //TODO: change any to an interface

  const buttonStyle = {
    borderRadius: "5px",
    width: "120px",
    height: "30px",
    transition: "background-color 0.3s ease",
  };

  const statusButtonStyle = {
    ...buttonStyle,
    borderRadius: "30px",
    padding: "5px 10px",
    textTransform: "none",
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre del Evento",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Fecha",
      flex: 1,
      valueGetter: (params: any) =>
        dayjs(params.startDate).format("DD/MM/YYYY"),
    },
    {
      field: "inscriptionPeriod",
      headerName: "Periodo de Inscripciones",
      flex: 1,
      valueGetter: () => "11AGO-30AGO",
    },
    {
      field: "cancelPeriod",
      headerName: "Periodo de Bajas",
      flex: 1,
      valueGetter: () => "11AGO-30AGO",
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      flex: 0.5,
      valueGetter: () => "4 horas",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: () => (
        <Button
          variant="contained"
          color="info"
          onClick={() => setIsDeleted((prev) => !prev)}
          style={{
            ...buttonStyle,
            backgroundColor: "#191970",
            color: "#FFFFFF",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#99c2ff")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#191970")
          }
        >
          Cancelar
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          style={{
            ...statusButtonStyle,
            backgroundColor:
              params.row.status === "PENDIENTE"
                ? "#5F9EA0"
                : params.row.status === "ACEPTADO"
                ? "#32CD32"
                : params.row.status === "SUPLENTE"
                ? "#000000"
                : "#FF0000",
            color: "#FFFFFF",
            cursor: "default",
          }}
          disabled
        >
          {params.row.status}
        </Button>
      ),
    },
  ];

  const rows = events.map((event) => ({
    id: event.id_event,
    name: event.name,
    startDate: event.startDate,
    endDate: event.startDate,
    status: event.status,
  }));

  const updatedRows = rows.slice(1, rows.length);

  return (
    <div style={{ position: 'relative', height: '100vh', paddingTop: '20px' }}> 
      <IconButton 
        onClick={handleBackClick} 
        aria-label="back"
        style={{ 
          position: 'absolute',
          top: '19px', 
          left: '16px', 
          zIndex: 1
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <ContainerPage
        title="Eventos actuales"
        subtitle="Administra y visualiza tus eventos"
        actions={
          <>
        <Button variant="contained" color="primary"  onClick={() => navigate("/eventHistory")} >
          HISTORIAL
        </Button>
          </>
        }
      >
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid 
            rows={!isDeleted ? rows : updatedRows}
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
        </div>
      </ContainerPage>
    </div>
  );
};

export default MyEventsTable;
