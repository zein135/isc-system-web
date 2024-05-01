import { useFormik } from "formik";
import * as Yup from "yup";
import { ProfessorInterface } from "../../services/models/Professor";
import { createProfessor } from "../../services/mentorsService";

const validationSchema = Yup.object({
  fullName: Yup.string().required("El nombre completo es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Solo números son permitidos")
    .optional(),
  academicTitle: Yup.string().required("El título académico es obligatorio"),
  employeeNumber: Yup.string().optional(),
});

const CreateProfessorPage = () => {
  const formik = useFormik<ProfessorInterface>({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      academicTitle: "",
      employeeNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await createProfessor(values);
      } catch (error) {
        console.error("Error al crear el docente:", error);
      }
    },
  });
  return (
    <div className="flex flex-col items-center w-full pt-10 p-4 h-full bg-[#D9E8F3]">
      <div className="bg-white lg:w-1/2 m-10 p-5 shadow-md rounded-lg h-full md:w-2/3 sm:w-full ">
        <div className="txt p-5">Crear Nuevo Docente</div>
        <form onSubmit={formik.handleSubmit}>
          {/* Nombre Completo */}
          <div className="flex-1">
            <label className="txt2" htmlFor="fullName">
              Nombre Completo:
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
              className={`select-2 ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.fullName}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>
          {/* Email */}
          <div className="flex-1">
            <label className="txt2" htmlFor="email">
              Correo Electrónico:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className={`select-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          {/* Número de Teléfono */}
          <div className="flex-1">
            <label className="txt2" htmlFor="phoneNumber">
              Número de Teléfono:
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              className={`select-2 ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.phoneNumber}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          {/* Título Académico */}
          <div className="flex-1">
            <label className="txt2" htmlFor="academicTitle">
              Título Académico:
            </label>
            <select
              id="academicTitle"
              name="academicTitle"
              onChange={formik.handleChange}
              value={formik.values.academicTitle}
              onBlur={formik.handleBlur}
              className={`select-2 ${
                formik.touched.academicTitle && formik.errors.academicTitle
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un título</option>
              <option value="licenciado">Licenciado</option>
              <option value="maestro">Maestro</option>
              <option value="doctor">Doctor</option>
            </select>
            {formik.touched.academicTitle && formik.errors.academicTitle ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.academicTitle}
              </div>
            ) : null}
          </div>
          {/* Número de Empleado */}
          <div className="flex-1">
            <label className="txt2" htmlFor="employeeNumber">
              Codigo de Docente:
            </label>
            <input
              id="employeeNumber"
              name="employeeNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.employeeNumber}
              onBlur={formik.handleBlur}
              className={`select-2 ${
                formik.touched.employeeNumber && formik.errors.employeeNumber
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div className="flex justify-center pt-5">
            <button type="submit" className="btn">
              Registrar Profesor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfessorPage;
