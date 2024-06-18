import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContainerPage from "../components/common/ContainerPage";
import { useEffect, useState } from "react";
import { getMentors } from "../services/mentorsService";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const columns: GridColDef[] = [
  {
    field: "code",
    headerName: "Código",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "degree",
    headerName: "Título",
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
    field: "lastName",
    headerName: "Apellido",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Celular",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "tutoring_count",
    headerName: "Tutorias",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "review_count",
    headerName: "Revisiones",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
];


const ProfessorPage = () => {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);

  const handleCreateTeacher = () => {
    navigate("/create-professor");
  };

  const fetchProfessors = async () => {
    const professors = await getMentors();
    setProfessors(professors.data);
    console.log(professors);
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return (
    <ContainerPage
      title={"Docentes"}
      subtitle={"Lista de docentes"}
      actions={
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateTeacher}
          startIcon={<AddIcon />}
        >
          Agregar docente
        </Button>
      }
      children={
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={professors}
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
      }
    ></ContainerPage>
  );
};

export default ProfessorPage;
