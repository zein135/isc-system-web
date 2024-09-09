import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ContainerPage from "../../components/common/ContainerPage";
import { Event } from "../../models/eventInterface";
import { useUserStore } from "../../store/store";
import { getInternEvents } from "../../services/internService";

interface EventWithType extends Event {
  type: string;
}

const MyEventsTable = () => {
  const user = useUserStore((state) => state.user);
  const [events, setEvents] = useState<EventWithType[]>();
  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/scholarshipHours");
  };

  const fetchMyEvents = async () => {
    const res = await getInternEvents(user!.id);
    if (res.success) {
      setEvents(res.data);
    }
  };

  useEffect(() => {
    fetchMyEvents();
    console.log(events, `events con id ${user!.id}`);
  }, []);

  useEffect(() => {
    events &&
      setRows(
        events.map((event) => ({
          id: event.id,
          name: event.title,
          startDate: `${dayjs(event.start_date).format("DD/MM")} -${dayjs(
            event.end_date
          ).format("DD/MM")}`,
          inscriptionPeriod: dayjs(event.registration_deadline).format("DD/MM"),
          cancelPeriod: `${
            dayjs(event.start_cancellation_date)?.format("DD/MM") ?? "N/A"
          } - ${dayjs(event.end_cancellation_date)?.format("DD/MM") ?? "N/A"}`,
          hours: `${event.assigned_hours} horas`,
          status: event.type.toLocaleUpperCase(),
        }))
      );
  }, [events]);

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
    },
    {
      field: "inscriptionPeriod",
      headerName: "Límite de inscripción",
      flex: 1,
    },
    {
      field: "cancelPeriod",
      headerName: "Periodo de Bajas",
      flex: 1,
    },
    {
      field: "hours",
      headerName: "Horas Becarias",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: () => (
        <Button
          variant="contained"
          color="info"
          onClick={() => handleDeleteClick()}
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
              params.row.status === "PENDING"
                ? "#5F9EA0"
                : params.row.status === "ACCEPTED"
                ? "#32CD32"
                : params.row.status === "RESERVE"
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

  const handleDeleteClick = () => {
    //TODO: implemente delete logi
  };
  return (
    <div style={{ position: "relative", height: "100vh", paddingTop: "19px" }}>
      <IconButton
        onClick={handleBackClick}
        aria-label="back"
        style={{
          position: "absolute",
          top: "17px",
          left: "-9px",
          zIndex: 1,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <ContainerPage
        title="Eventos actuales"
        subtitle="Administra y visualiza tus eventos"
        actions={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/eventHistory")}
            >
              HISTORIAL
            </Button>
          </>
        }
      >
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows || []}
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