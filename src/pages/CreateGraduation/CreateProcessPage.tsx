import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { periods } from "../../data/periods";
import { Modes } from "../../models/modeInterface";
import { getModes } from "../../services/modesService";
import {
  createGraduationProcess,
} from "../../services/processServicer";
import { getStudents } from "../../services/studentService";
import { Student } from "../../models/studentInterface";

import { GraduationProcess } from "../../services/models/GraduationProcess";
import { FormContainer } from "./components/FormContainer";
import { SelectField } from "./components/SelectField";
import { TextField } from "./components/TextField";
import ProcessForm from "./components/ProcessForm";

const validationSchema = Yup.object({
  student_id: Yup.string().required("* Debe seleccionar un estudiante"),
  modality_id: Yup.string().required("* Debe seleccionar un modo"),
  period: Yup.string().required("* Debe seleccionar un periodo"),
  project_name: Yup.string().required("* Debe colocar el nombre del proyecto"),
});

const CreateProcessPage = () => {
  const [, setError] = useState<string | null>(null);
  const [modes, setModes] = useState<Modes[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  
  const fetchData = useCallback(async () => {
    try {
      const responseModes = await getModes();
      const responseStudents = await getStudents();
      setModes(responseModes.data);
      setStudents(responseStudents.data);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setError("Failed to load data, please try again.");
    }
  }, []); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formik = useFormik({
    initialValues: {
      student_id: "",
      modality_id: "",
      period: "",
      project_name: "",
    },
    validationSchema,
    onSubmit: (values: GraduationProcess) => {
      console.log(values);
      createGraduationProcess(values);
      //onNext();
    },
  });
  return (
    <FormContainer>
      <div className="txt p-5">Crear Proceso de Graduación</div>
      {/* <form onSubmit={formik.handleSubmit} className="mx-16">
        <SelectField
          label="1. Seleccione un estudiante"
          name="student_id"
          options={students}
          formik={formik}
        />
        <SelectField
          label="2. Seleccione la modalidad"
          name="modality_id"
          options={modes}
          formik={formik}
        />
        <SelectField
          label="3. Seleccione el periodo de inscripción"
          name="period"
          options={periods}
          formik={formik}
        />
        <TextField
          label="4. Ingrese el nombre del proyecto"
          name="project_name"
          formik={formik}
        />
        <div className="flex justify-center pt-5">
          <button type="submit" className="btn">
            Crear
          </button>
        </div>
      </form> */}

      <ProcessForm/>
    </FormContainer>
  );
};

export default CreateProcessPage;
