import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { events } from "../../data/events";
import dayjs from "dayjs";
import ContainerPage from "../common/ContainerPage";
import { useState } from "react";

const MyEventsTable = () => {
  //TODO: add real logic to "no podre asistir" button
  const [isDeleted, setIsDeleted] = useState(false);
  //TODO: change any to an interface
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
        >
          No podré asistir
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
          color={
            params.row.status === "PENDIENTE"
              ? "info"
              : params.row.status === "ACEPTADO"
              ? "success"
              : "error"
          }
        >
          {params.row.status}
          {console.log(params.row)}
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
  console.log(rows, updatedRows, "xdd");

  return (
    <ContainerPage
      title="Eventos actuales"
      subtitle="Administra y visualiza tus eventos"
      actions={
        <Button variant="contained" color="primary">
          HISTORIAL
        </Button>
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
  );
};

export default MyEventsTable;
