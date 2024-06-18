import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Mentor } from "../../models/mentorInterface";
import * as Yup from "yup";
import { getMentors } from "../../services/mentorsService";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Autocomplete, Grid, TextField } from "@mui/material";

const validationSchema = Yup.object({
  mentor: Yup.string(),
  tutorDesignationLetterSubmitted: Yup.boolean(),
  date_tutor_assignament: Yup.mixed()
    .required("Debe seleccionar una fecha")
    .nullable(),
});

interface InternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const MentorStage: FC<InternalDefenseStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const process = useProcessStore((state) => state.process);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [viewMode, setViewMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setMentors(response.data);
        if (process?.tutor_id) {
          const mentor = response.data.find(
            (mentor: Mentor) => mentor.id === process.tutor_id
          );
          setSelectedMentor(mentor || null);
        }
        if (process && process?.stage_id > 1) {
          setViewMode(true);
        }
      } catch (error) {
        setError("Error getting mentors");
      }
    };

    fetchData();
  }, []);

  const saveStage = async () => {
    if (process) {
      const {
        mentor,
        tutorDesignationLetterSubmitted,
        date_tutor_assignament,
      } = formik.values;
      process.tutor_letter = tutorDesignationLetterSubmitted;
      process.tutor_id = Number(mentor);
      process.date_tutor_assignament = date_tutor_assignament
        ? dayjs(date_tutor_assignament)
        : null;
      if (isApproveButton) {
        process.stage_id = 2;
        process.tutor_approval = true;
        process.tutor_approval_date = new Date();
        onNext();
      }
      setProcess(process);
      await updateProcess(process);
    }
  };

  const handleModalAction = () => {
    saveStage();
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      tutorDesignationLetterSubmitted: process?.tutor_letter || false,
      date_tutor_assignament: process?.date_tutor_assignament
        ? dayjs(process.date_tutor_assignament)
        : dayjs(),
      mentor: process?.tutor_id || "",
    },
    validationSchema,
    onSubmit: (_values) => {
      if (canApproveStage()) {
        setShowModal(true);
      } else {
        saveStage();
      }
    },
  });

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date_tutor_assignament", value);
  };

  const canApproveStage = () => {
    return (
      formik.values.mentor && formik.values.tutorDesignationLetterSubmitted
    );
  };

  const handleMentorChange = (event: any, value: any) => {
    formik.setFieldValue("mentor", value?.id || "");
  };
  
  const isApproveButton = canApproveStage();

  return (
    <>
      <div className="txt1">Etapa 2: Seleccionar Tutor</div>
      <form onSubmit={formik.handleSubmit} className="mx-16">
        <Grid container spacing={3}>
          <Grid item xs={6} marginTop={5}>
            <Autocomplete
              disabled={viewMode}
              id="mentor"
              options={mentors}
              getOptionLabel={(option) => `${option.name} ${option.lastName}`}
              value={selectedMentor}
              onChange={handleMentorChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccionar Tutor"
                  name="mentor"
                  value={formik.values.mentor}
                  error={formik.touched.mentor && Boolean(formik.errors.mentor)}
                  helperText={formik.touched.mentor && formik.errors.mentor}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} marginTop={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={viewMode}
                label="Fecha de Asignación de Tutor"
                value={formik.values.date_tutor_assignament}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <div className="mt-5">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="tutorDesignationLetterSubmitted"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              className="checkbox"
              disabled={viewMode}
            />
            <span className="ml-2 text-gray-700">
              Carta de Asignación de Tutor Presentada
            </span>
          </label>
          {formik.touched.tutorDesignationLetterSubmitted &&
          formik.errors.tutorDesignationLetterSubmitted ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.tutorDesignationLetterSubmitted}
            </div>
          ) : null}
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={onPrevious} className="btn2">
            Anterior
          </button>
          <button type="submit" className="btn">
            {isApproveButton ? "Finalizar Etapa" : "Guardar"}
          </button>
        </div>
      </form>
      {showModal && (
        <ConfirmModal
          step={steps[1]}
          nextStep={steps[2]}
          isApproveButton={isApproveButton}
          setShowModal={setShowModal}
          onNext={handleModalAction}
        />
      )}
    </>
  );
};
