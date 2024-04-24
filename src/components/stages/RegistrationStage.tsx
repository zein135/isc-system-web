import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modes } from "../../models/modeInterface";
import { getModes } from "../../services/modesService";
import { Modal } from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { periods, currentPeriod } from '../../data/periods';
import { useProcessStore } from "../../store/store";
import { updateProcess } from '../../services/processServicer';
const validationSchema = Yup.object({
  mode: Yup.string().required("* La modalidad es obligatoria"),
  period: Yup.date().required("* El periodo es obligatorio"),
});

interface RegistrationStageProps {
  onNext: () => void;
}

const getIdFromValue = (value: string) => {
  const period = periods.find((period) => period.value === value);
  return period ? period.id : "";
};

const getValueFromId = (id: number) => {
  const period = periods.find((period) => period.id === id);
  return period ? period.value : "";
}

export const RegistrationStage: FC<RegistrationStageProps> = ({
  onNext,
}) => {
  const studentProcess = useProcessStore(state => state.process);
  const setProcess = useProcessStore(state => state.setProcess);
  const [modes, setModes] = useState<Modes[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setError] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModes();
        setModes(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  const saveStage = async (mode: number, period: string) => {
    if (studentProcess) {
      studentProcess.modality_id = mode;
      studentProcess.period = period;
      setProcess(studentProcess);
      await updateProcess(studentProcess);
      onNext();
    }
  };

  const handleModalAction = () => {
    saveStage(formik.values.mode, getValueFromId(Number(formik.values.period)));
    setIsVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      mode: Number(studentProcess?.modality_id),
      period: getIdFromValue(studentProcess?.period || currentPeriod),
    },
    validationSchema,
    onSubmit: () => {
      setShowModal(true);
    },
  });

  return (
    <>
      <div className="txt1">Etapa 1: Seminario de Grado</div>
      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <label className="txt2">1. Seleccione la modalidad</label>
            <div className="flex flex-col space-y-2 mt-2 mx-2">
              {modes.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value={option.id}
                    disabled
                    onChange={formik.handleChange}
                    checked={formik.values.mode === option.id}
                    className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 focus:ring-secondary dark:focus:ring-secondary"
                  />
                  <span className="ml-2 text-md font-normal text-neutral-600">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
            {formik.touched.mode && formik.errors.mode ? (
              <div className="text-red-1 text-xs font-medium mt-1">
                {formik.errors.mode}
              </div>
            ) : null}
          </div>
          <div className="flex-1">
            <label className="txt2">2. Seleccione periodo de inscripción</label>
            <select
              id="period"
              name="period"
              onChange={formik.handleChange}
              value={formik.values.period}
              disabled
              className={`select-1 ${formik.touched.period && formik.errors.period
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
              <div className="text-red-1 text-xs font-medium mt-1">
                {formik.errors.period}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button type="submit" className="btn">
            Siguiente
          </button>
        </div>
      </form>
      {showModal &&
        <ConfirmModal step={steps[0]} nextStep={steps[1]} setShowModal={setShowModal} onNext={handleModalAction} />

      }
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};
