import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";

const validationSchema = Yup.object({
  president: Yup.string().required("* Debe agregar un presidente"),
  secretary: Yup.string().required("* Debe agregar un secretario"),
  date: Yup.string().required("* Debe seleccionar una fecha"),
});

interface ExternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ExternalDefenseStage: FC<ExternalDefenseStageProps> = ({
  onPrevious,
  onNext,
}) => {
  //const [secretaries, setSecretaries] = useState<Mentor[]>([]);
  //const [presidents, setPresidents] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
       // const response = await getMentors();
        //setSecretaries(response.data);
        //setPresidents(response.data);
      } catch (error) {
        setError("error");
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      president: "",
      secretary: "",
      date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowModal(true);
      //onNext();
    },
  });

  return (
    <>
      <div className="txt1">Etapa Final: Defensa Externa</div>

      <form onSubmit={formik.handleSubmit} className="mx-16 ">
        <div className="flex flex-col">
          <div className="flex-1 mt-5 ">
            <label htmlFor="president" className="txt2">
              1. Seleccione un presidente
            </label>
            <input
              id="president"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="president"
              type="text"
              placeholder="Escriba el nombre del presidente"
              onChange={formik.handleChange}
              value={formik.values.president}
            />
             
            {formik.touched.president && formik.errors.president ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.president}
            </div>
          ) : <div className="h-5"/>}
            <label htmlFor="secretary" className="txt2">
              2. Seleccione un secretario
            </label>
            <input
              id="secretary"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="secretary"
              type="text"
              placeholder="Escriba el nombre del secretario"
              onChange={formik.handleChange}
              value={formik.values.secretary}
            />
              
            {formik.touched.secretary && formik.errors.secretary ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.secretary}
            </div>
          ) : <div className="h-5"/>}
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="txt2">
              3. Seleccione una fecha
            </label>
            <input
              type="date"
              onChange={formik.handleChange}
              id="date"
              name="date"
              className="select-1 border-gray-300"/>
            {formik.touched.date && formik.errors.date ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.date}
            </div>
          ) : <div className="h-5"/>}
          </div>
        </div>

        <div className="flex justify-between pt-5">
          <button type="button" onClick={onPrevious} className="btn2">
            Anterior
          </button>
          <button type="submit" className="btn">
            Siguiente
          </button>
        </div>
      </form>
      {showModal && (
        <ConfirmModal
          step={steps[4]}
          nextStep="Resumen"
          setShowModal={setShowModal}
          onNext={onNext}
        />
      )}
    </>
  );
};
