import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Mentor } from "../../models/mentorInterface";
import * as Yup from "yup";
import { getMentors } from "../../services/mentorsService";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";

const validationSchema = Yup.object({
  mentor: Yup.string().required("* Debe seleccionar un tutor"),
});

interface InternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const MentorStage: FC<InternalDefenseStageProps> = ({ onPrevious, onNext }) => {
  const process = useProcessStore(state => state.process);
  const setProcess = useProcessStore(state => state.setProcess);
  
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setMentors(response.data);
      } catch (error) {
        setError("Error getting mentors");
      }
    };

    fetchData();
  }, []);

  const saveStage = async () => {
    if (process) {
      const { mentor, tutorDesignationLetterSubmitted } = formik.values;
      process.tutor_letter = tutorDesignationLetterSubmitted;
      process.tutor_id = mentor;
      setProcess(process);
      await updateProcess(process);
      onNext();
    }
  };

  const handleModalAction = () => {
    saveStage();
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      tutorDesignationLetterSubmitted: process?.tutor_letter || false,
      mentor: process?.tutor_id,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      if (canApproveStage()) {
        setShowModal(true);
      }
    },
  });

  const canApproveStage = () => formik.values.mentor && formik.values.tutorDesignationLetterSubmitted;
  const isApproveButton = canApproveStage();

  return (
    <>
      <div className="txt1">Etapa 2: Seleccionar Tutor</div>
      <form onSubmit={formik.handleSubmit} className="mx-16">
        <div className="my-5">
          <label htmlFor="mentor" className="txt2">
            Seleccione el tutor del estudiante
          </label>
          <select
            id="mentor"
            name="mentor"
            onChange={formik.handleChange}
            value={formik.values.mentor}
            className={`select-1 ${formik.touched.mentor && formik.errors.mentor
                ? "border-red-1"
                : "border-gray-300"
              }`}          >
            <option value="">Seleccione un Tutor</option>
            {mentors.map((option) => (
              <option key={option.id} value={option.id}>
                {`${option.name} ${option.lastName}`}
              </option>
            ))}
          </select>
          {formik.touched.mentor && formik.errors.mentor ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.mentor}
            </div>
          ) : null}
        </div>

        <div className="mt-5">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="tutorDesignationLetterSubmitted"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              className="checkbox"
            />
            <span className="ml-2 text-gray-700">
              Carta de Asignación de Tutor Presentada
            </span>
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onPrevious} className="btn2">
            Anterior
          </button>
          <button type="submit" className="btn">
            {isApproveButton ? "Aprobar" : "Guardar"}
          </button>
        </div>
      </form>
      {showModal &&
        <ConfirmModal step={steps[1]} nextStep={steps[2]} setShowModal={setShowModal} onNext={handleModalAction} />
      }
    </>
  );
};
