// import { Checkbox, TextField } from "@mui/material";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import { useState } from "react";

// const ViewInternSupervisor = () => {
//   const [students, setStudents] = useState([
//     {
//       id: 1,
//       name: "Alexia Diana Marín Mamani",
//       code: "608555",
//       observations: "",
//       assistance: true
//     },
//     {
//       id: 2,
//       name: "Rodrigo Gustavo Reyes Monzón",
//       code: "679523",
//       observations: "",
//       assistance: false
//     },
//   ]);

//   const handleCheckboxChange = (id: number, checked: boolean) => {
//     const updatedStudents = students.map((student) =>
//       student.id === id ? { ...student, assistance: checked } : student
//     );
//     setStudents(updatedStudents);
//   };

//   const handleObservationChange = (id: number, value: string) => {
//     const updatedStudents = students.map((student) =>
//       student.id === id ? { ...student, observations: value } : student
//     );
//     setStudents(updatedStudents);
//   };

//   const columns: GridColDef[] = [
//     {
//       field: "name",
//       headerName: "Nombre del becario/a",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//     },
//     {
//       field: "code",
//       headerName: "Código",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//     },
//     {
//       field: "observations",
//       headerName: "Observaciones",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//       editable: true,
//       renderCell: (params: GridRenderCellParams<string>) => (
//         <TextField
//           value={params.value || ""}
//           onChange={(event) => handleObservationChange(params.id, event.target.value)}
//           inputProps={{ maxLength: 2500 }}
//           variant="standard"
//           fullWidth
//         />
//       ),
//     },
//     {
//       field: "assistance",
//       headerName: "Asistencia",
//       headerAlign: "center",
//       align: "center",
//       flex: 1,
//       renderCell: (params: GridRenderCellParams<boolean>) => (
//         <Checkbox
//           checked={params.value}
//           onChange={(event) =>
//             handleCheckboxChange(params.id, event.target.checked)
//           }
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={students}
//         columns={columns}
//         pageSize={5}
//         processRowUpdate={(newRow: any) => {
//           if (newRow.observations.length > 2500) {
//             alert("El texto no puede superar los 2500 caracteres.");
//             return { ...newRow, observations: newRow.observations.slice(0, 2500) };
//           }
//           return newRow;
//         }}
//       />
//     </div>
//   );
// };

// export default ViewInternSupervisor;
