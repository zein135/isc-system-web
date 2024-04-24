import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    student: Yup.string().required("* Debe seleccionar un estudiante"),
    mode: Yup.string().required("* Debe seleccionar un modo"),
    period: Yup.string().required("* Debe seleccionar un periodo"),
});

const CreateProfessorPage = () => {
    const formik = useFormik({
        initialValues: {
            student: "",
            mode: "",
            period: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            //onNext();

        },
    });
    return (
        <div className="flex flex-col items-center w-full pt-10 p-4 h-full bg-[#D9E8F3]">
            <div className="bg-white lg:w-1/2 m-10 p-5 shadow-md rounded-lg h-full md:w-2/3 sm:w-full ">
                <div className="txt p-5">Crear Nuevo Docente</div>
                <form onSubmit={formik.handleSubmit} className="mx-16 ">

                </form>
            </div>
        </div>);
}

export default CreateProfessorPage;