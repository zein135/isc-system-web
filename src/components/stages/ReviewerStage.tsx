import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import { Mentor } from "../../models/mentorInterface";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProfessorAutocomplete from "../selects/ProfessorAutoComplete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DownloadButton from "../common/DownloadButton";
import { letters } from "../../constants/letters";
const { TUTOR_APPROBAL, TUTOR_ASSIGNMENT } = letters;

const validationSchema = Yup.object({
  reviewer: Yup.string().required("* El revisor es obligatorio"),
  reviewerDesignationLetterSubmitted: Yup.boolean(),
  date_reviewer_assignament: Yup.mixed().required("Debe seleccionar una fecha"),
});

interface ReviewerStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

const program = "Ingeniería de Sistemas Computacionales";
const headOfDepartment = "Alexis Marechal Marin PhD";

export const ReviewerStage: FC<ReviewerStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const process = useProcessStore((state) => state.process);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      reviewerLetter: process?.reviewer_letter || false,
      date_reviewer_assignament: process?.date_reviewer_assignament
        ? dayjs(process.date_reviewer_assignament)
        : dayjs(),
      reviewer: process?.reviewer_id || "",
    },
    validationSchema,
    onSubmit: () => {
      setShowModal(true);
    },
  });

  const saveStage = async () => {
    if (process) {
      const { reviewer, reviewerLetter } = formik.values;
      process.reviewer_letter = reviewerLetter;
      process.reviewer_id = Number(reviewer);
      process.stage_id = 3;
      process.reviewer_approval = true;
      process.reviewer_approval_date = new Date();
      setProcess(process);
      await updateProcess(process);
      onNext();
    }
  };

  const handleModalAction = () => {
    saveStage();
    setShowModal(false);
  };

  const handleMentorChange = ( _event: React.ChangeEvent<unknown>,
    value: Mentor | null) => {
    formik.setFieldValue("reviewer", value?.id || "");
  };

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date_reviewer_assignament", value);
  };

  const canApproveStage = () => {
    return Boolean(
      formik.values.reviewer &&
        formik.values.reviewerLetter &&
        formik.values.date_reviewer_assignament
    );
  };

  const isApproveButton = canApproveStage();
  
  const editForm = () => {
    setEditMode(false);
  };
  
  return (
    <>
      <div className="txt1 pb-3">
        Etapa 3: Seleccionar Revisor <ModeEditIcon onClick={editForm}/>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ProfessorAutocomplete
              disabled={editMode}
              value={String(formik.values.reviewer)}
              onChange={handleMentorChange}
              id="reviewer"
              label={"Seleccionar Revisor"}
            />
            {formik.touched.reviewer && formik.errors.reviewer ? (
              <div className="text-red-1 text-xs mt-1">
                {formik.errors.reviewer}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={editMode}
                label="Fecha de Asignación"
                value={formik.values.date_reviewer_assignament}
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
                name="reviewerLetter"
                color="primary"
                checked={formik.values.reviewerLetter}
                onChange={formik.handleChange}
                disabled={editMode}
              />
            }
            label="Carta de Designación de Revisor Presentada"
          />
          {formik.touched.reviewerLetter &&
          formik.errors.reviewerLetter ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.reviewerLetter}
            </div>
          ) : null}
          <DownloadButton
            url={TUTOR_ASSIGNMENT.path}
            data={{
              student: process?.student_name || "",
              tutor: formik.values.reviewer,
              jefe_carrera: headOfDepartment,
              carrera: program,
              dia: dayjs().format("DD"),
              mes: dayjs().format("MMMM"),
              ano: dayjs().format("YYYY"),
            }}
            filename={`${TUTOR_ASSIGNMENT.filename}_${formik.values.reviewer}.${TUTOR_ASSIGNMENT.extention}`}
          />
        </Box>

        <Box mt={3}>
          <FormControlLabel
            control={
              <Checkbox
                name="tutorApprovalLetterSubmitted"
                color="primary"
                checked={formik.values.reviewerLetter}
                onChange={formik.handleChange}
                disabled={editMode}
              />
            }
            label="Carta de Aprobación de Tutor Presentada"
          />
          {formik.touched.reviewerLetter &&
          formik.errors.reviewerLetter ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.reviewerLetter}
            </div>
          ) : null}
          <DownloadButton
            url={TUTOR_APPROBAL.path}
            data={{
              student: process?.student_name || "",
              tutor: process?.tutor_name || "",
              jefe_carrera: headOfDepartment,
              carrera: program,
              dia: dayjs().format("DD"),
              mes: dayjs().format("MMMM"),
              ano: dayjs().format("YYYY"),
              title_project: process?.project_name || "",
              date: dayjs(formik.values.date_reviewer_assignament).format(
                "DD/MM/YYYY"
              ),
            }}
            filename={`${TUTOR_APPROBAL.filename}_${formik.values.reviewer}.${TUTOR_APPROBAL.extention}`}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button 
            type="button"
            variant="contained"
            color="secondary"
            onClick={onPrevious}
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
          step={steps[2]}
          nextStep={steps[3]}
          setShowModal={setShowModal}
          isApproveButton={isApproveButton}
          onNext={handleModalAction}
        />
      )}
    </>
  );
};
