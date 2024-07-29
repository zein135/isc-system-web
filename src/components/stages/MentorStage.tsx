import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Box, FormControlLabel, Checkbox, Button } from "@mui/material";

import ProfessorAutocomplete from "../selects/ProfessorAutoComplete";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import { Mentor } from "../../models/mentorInterface";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DownloadButton from "../common/DownloadButton";
import { letters } from "../../constants/letters";
import { useCarrerStore } from "../../store/carrerStore";

const { TUTOR_APPROBAL, TUTOR_ASSIGNMENT } = letters;
const CURRENT_STAGE = 1;

const validationSchema = Yup.object({
  mentor: Yup.string().required("Debe seleccionar un tutor"),
  mentorName: Yup.string().required("Debe seleccionar un tutor"),
  tutorDesignationLetterSubmitted: Yup.boolean(),
  tutorApprovalLetterSubmitted: Yup.boolean(),
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
  const carrer = useCarrerStore((state) => state.carrer);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(
    CURRENT_STAGE < (process?.stage_id || 0)
  );

  const formik = useFormik({
    initialValues: {
      tutorDesignationLetterSubmitted: process?.tutor_letter || false,
      tutorApprovalLetterSubmitted: process?.tutor_approval || false,
      date_tutor_assignament: process?.date_tutor_assignament
        ? dayjs(process.date_tutor_assignament)
        : dayjs(),
      mentor: process?.tutor_id || "",
      mentorName: process?.tutor_name || "",
    },
    validationSchema,
    onSubmit: () => {
      if (canApproveStage()) {
        setShowModal(true);
      } else {
        saveStage();
      }
    },
  });

  const saveStage = async () => {
    if (process) {
      const {
        mentor,
        mentorName,
        tutorDesignationLetterSubmitted,
        date_tutor_assignament,
      } = formik.values;

      const updatedProcess = {
        ...process,
        tutor_letter: tutorDesignationLetterSubmitted,
        tutor_id: Number(mentor),
        tutor_name: mentorName,
        date_tutor_assignament: date_tutor_assignament
          ? date_tutor_assignament.toDate()
          : null,
        ...(isApproveButton && {
          stage_id: 2,
          tutor_approval: true,
          tutor_approval_date: new Date(),
        }),
      };

      setProcess(updatedProcess);

      try {
        await updateProcess(updatedProcess);
        if (isApproveButton) {
          onNext();
        }
      } catch (error) {
        console.error("Error updating process:", error);
      }
    }
  };

  const handleModalAction = () => {
    saveStage();
    setShowModal(false);
  };

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date_tutor_assignament", value);
  };

  const canApproveStage = () => {
    return Boolean(
      formik.values.mentor &&
        formik.values.tutorDesignationLetterSubmitted &&
        formik.values.date_tutor_assignament
    );
  };

  const handleMentorChange = (
    _event: React.ChangeEvent<unknown>,
    value: Mentor | null
  ) => {
    formik.setFieldValue("mentor", value?.id || "");
    formik.setFieldValue("mentorName", value?.name || "");
  };

  const isApproveButton = canApproveStage();

  const editForm = () => {
    setEditMode(false);
  };

  return (
    <>
      <div className="txt1">
        Etapa 2: Seleccionar Tutor <ModeEditIcon onClick={editForm} />
      </div>

      <form onSubmit={formik.handleSubmit} className="mx-16">
        <Grid container spacing={3}>
          <Grid item xs={6} marginTop={5}>
            <ProfessorAutocomplete
              disabled={editMode}
              value={String(formik.values.mentor)}
              onChange={handleMentorChange}
              id="mentor"
              label={"Seleccionar Tutor"}
            />
            {formik.touched.mentor && formik.errors.mentor ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.mentor}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={6} marginTop={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={editMode}
                label="Fecha de Asignación"
                value={formik.values.date_tutor_assignament}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box mt={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="tutorDesignationLetterSubmitted"
                color="primary"
                checked={formik.values.tutorDesignationLetterSubmitted}
                onChange={formik.handleChange}
                disabled={editMode}
              />
            }
            label="Carta de Asignación de Tutor Presentada"
          />
          {formik.touched.tutorDesignationLetterSubmitted &&
          formik.errors.tutorDesignationLetterSubmitted ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.tutorDesignationLetterSubmitted}
            </div>
          ) : null}
          <DownloadButton
            url={TUTOR_ASSIGNMENT.path}
            data={{
              student: process?.student_name || "",
              tutor: formik.values.mentorName,
              jefe_carrera: carrer?.headOfDepartment || "",
              carrera: carrer?.fullName || "",
              dia: dayjs().format("DD"),
              mes: dayjs().format("MMMM"),
              ano: dayjs().format("YYYY"),
            }}
            filename={`${TUTOR_ASSIGNMENT.filename}_${formik.values.mentorName}.${TUTOR_ASSIGNMENT.extention}`}
          />
        </Box>
        <Box mt={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="tutorApprovalLetterSubmitted"
                color="primary"
                checked={formik.values.tutorApprovalLetterSubmitted}
                onChange={formik.handleChange}
                disabled={editMode}
              />
            }
            label="Carta de Aprobación de Tutor Presentada"
          />
          {formik.touched.tutorApprovalLetterSubmitted &&
          formik.errors.tutorApprovalLetterSubmitted ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.tutorApprovalLetterSubmitted}
            </div>
          ) : null}
          <DownloadButton
            url={TUTOR_APPROBAL.path}
            data={{
              student: process?.student_name || "",
              tutor: process?.tutor_name || "",
              jefe_carrera: carrer?.headOfDepartment || "",
              carrera: carrer?.fullName || "",
              dia: dayjs().format("DD"),
              mes: dayjs().format("MMMM"),
              ano: dayjs().format("YYYY"),
              title_project: process?.project_name || "",
              date: dayjs(formik.values.date_tutor_assignament).format(
                "DD/MM/YYYY"
              ),
            }}
            filename={`${TUTOR_APPROBAL.filename}_${formik.values.mentorName}.${TUTOR_APPROBAL.extention}`}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            type="button"
            onClick={onPrevious}
            variant="contained"
            color="secondary"
          >
            Anterior
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isApproveButton ? "Aprobar Etapa" : "Guardar"}
          </Button>
        </Box>
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
