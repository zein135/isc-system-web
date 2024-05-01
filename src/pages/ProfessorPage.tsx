import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "Código", 
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  { field: "fullName", headerName: "Nombre",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  { field: "academicTitle", headerName: "Título",
    width: 200,
    headerAlign: "center",
    align: "center",
   },
  {
    field: "phoneNumber",
    headerName: "Celular",
    type: "number",
    minWidth: 150,
    headerAlign: "center",
    align: "center",

  },
];

const rows = [
  { id: 1, fullName: "Snow", academicTitle: "Jon", phoneNumber: 35 },
  { id: 2, fullName: "Lannister", academicTitle: "Cersei", phoneNumber: 42 },
  { id: 3, fullName: "Lannister", academicTitle: "Jaime", phoneNumber: 45 },
  { id: 4, fullName: "Stark", academicTitle: "Arya", phoneNumber: 16 },
  {
    id: 5,
    fullName: "Targaryen",
    academicTitle: "Daenerys",
    phoneNumber: null,
  },
  { id: 6, fullName: "Melisandre", academicTitle: null, phoneNumber: 150 },
  { id: 7, fullName: "Clifford", academicTitle: "Ferrara", phoneNumber: 44 },
  { id: 8, fullName: "Frances", academicTitle: "Rossini", phoneNumber: 36 },
  { id: 9, fullName: "Roxie", academicTitle: "Harvey", phoneNumber: 65 },
];

const ProfessorPage = () => {
  const navigate = useNavigate();

  const handleCreateTeacher = () => {
    navigate("/create-professor");
  };

  return (
    <Container fixed>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 mb-8 mt-5 overflow-hidden justify-end">
        <button
          onClick={handleCreateTeacher}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Crear Docente
        </button>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
    </Container>
  );
};

export default ProfessorPage;
