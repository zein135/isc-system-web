import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { periods } from "../data/periods";
import { Modes } from "./../models/modeInterface";
import { getModes } from "../services/modesService";
import { getProcess } from "../services/processServicer";
import { Student } from "../models/studentInterface";

const validationSchema = Yup.object({
  student: Yup.string().required("* Debe seleccionar un estudiante"),
  mode: Yup.string().required("* Debe seleccionar un modo"),
  period: Yup.string().required("* Debe seleccionar un periodo"),
  project_name: Yup.string().required("* Debe colocar el nombre del proyecto"),
});

const createProcessPage = () => {
  const [, setError] = useState<string | null>(null);
  const [modes, setModes] = useState<Modes[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseModes = await getModes();
        const responseStudents = await getProcess();
        setModes(responseModes.data);
        setStudents(responseStudents.data);
        //setPresidents(response.data);
      } catch (error) {
        setError("error");
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      student: "",
      mode: "",
      period: "",
      project_name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //onNext();
    },
  });
  return (
    <>
      <div className="flex flex-col items-center w-full pt-10 p-4 h-full bg-[#D9E8F3] ">
        <div className="bg-white lg:w-1/2 m-10 p-5 shadow-md rounded-lg h-full md:w-2/3 sm:w-full ">
          <div className="txt p-5">Crear Proceso de Graduación</div>

          <form onSubmit={formik.handleSubmit} className="mx-16 ">
            <div className="flex flex-col">
              <div className="flex-1">
                <label className="txt2">1. Seleccione un estudiante</label>
                <select
                  id="student"
                  name="student"
                  onChange={formik.handleChange}
                  value={formik.values.student}
                  className={`select-2 ${
                    formik.touched.student && formik.errors.student
                      ? "border-red-1"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione un estudiante</option>
                  {students.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.student_name}
                    </option>
                  ))}
                </select>

                {formik.touched.student && formik.errors.student ? (
                  <div className="text-red-1 text-xs mt-1">
                    {formik.errors.student}
                  </div>
                ) : (
                  <div className="h-5" />
                )}

                <div className="flex-1">
                  <label className="txt2">2. Seleccione la modalidad</label>
                  <select
                    id="mode"
                    name="mode"
                    onChange={formik.handleChange}
                    value={formik.values.mode}
                    className={`select-2 ${
                      formik.touched.mode && formik.errors.mode
                        ? "border-red-1"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Seleccione la modalidad</option>
                    {modes.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.mode && formik.errors.mode ? (
                    <div className="text-red-1 text-xs mt-1">
                      {formik.errors.mode}
                    </div>
                  ) : (
                    <div className="h-5" />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="txt2">
                  3. Seleccione el periodo de inscripción
                </label>
                <select
                  id="period"
                  name="period"
                  onChange={formik.handleChange}
                  value={formik.values.period}
                  className={`select-2 ${
                    formik.touched.period && formik.errors.period
                      ? "border-red-1"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione Periodo</option>
                  {periods.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {formik.touched.period && formik.errors.period ? (
                  <div className="text-red-1 text-xs mt-1">
                    {formik.errors.period}
                  </div>
                ) : (
                  <div className="h-5" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <label className="txt2">
                4. Ingrese el nombre del proyecto
              </label>
              <input
                id="project_name"
                name="project_name"
                onChange={formik.handleChange}
                value={formik.values.project_name}
                placeholder="Ingrese el nombre del proyecto"
                className={`select-2 ${
                  formik.touched.project_name && formik.errors.project_name
                    ? "border-red-1"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.project_name && formik.errors.project_name ? (
                <div className="text-red-1 text-xs mt-1">
                  {formik.errors.project_name}
                </div>
              ) : (
                <div className="h-5" />
              )}
            </div>

            <div className="flex justify-center pt-5">
              <button type="submit" className="btn">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default createProcessPage;
