import { Checkbox, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { useState } from "react";

interface StudentRow {
  id: number;
  name: string;
  code: string;
  observations: string;
  assistance: boolean;
}

const ViewInternSupervisor = () => {
  const [students, setStudents] = useState<StudentRow[]>([
    {
      id: 1,
      name: "Alexia Diana Marín Mamani",
      code: "608555",
      observations: "",
      assistance: true
    },
    {
      id: 2,
      name: "Rodrigo Gustavo Reyes Monzón",
      code: "679523",
      observations: "",
      assistance: false
    },
  ]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, assistance: checked } : student
    );
    setStudents(updatedStudents);
  };

  const handleObservationChange = (id: number, value: string) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, observations: value } : student
    );
    setStudents(updatedStudents);
  };

  const columns: GridColDef<StudentRow>[] = [
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
      field: "observations",
      headerName: "Observaciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: true,
      renderCell: (params: GridRenderCellParams<StudentRow, string>) => (
        <TextField
          value={params.value || ""}
          onChange={(event) => handleObservationChange(params.id as number, event.target.value)}
          inputProps={{ maxLength: 2500 }}
          variant="standard"
          fullWidth
        />
      ),
    },
    {
      field: "assistance",
      headerName: "Asistencia",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params: GridRenderCellParams<StudentRow, boolean>) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleCheckboxChange(params.id as number, event.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSizeOptions={[5]} // Cambiado a `pageSizeOptions` porque `pageSize` fue eliminado en versiones recientes
        processRowUpdate={(newRow: StudentRow) => {
          if (newRow.observations.length > 2500) {
            alert("El texto no puede superar los 2500 caracteres.");
            return { ...newRow, observations: newRow.observations.slice(0, 2500) };
          }
          return newRow;
        }}
      />
    </div>
  );
};

export default ViewInternSupervisor;
