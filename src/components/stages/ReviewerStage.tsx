import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { useProcessStore } from "../../store/store";
import { updateProcess } from "../../services/processServicer";
import ReviewerSelect from "../selects/ReviewerSelect";

const validationSchema = Yup.object({
  reviewer: Yup.string().required("* El revisor es obligatorio"),
});

interface ReviewerStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ReviewerStage: FC<ReviewerStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const process = useProcessStore((state) => state.process);
  const setProcess = useProcessStore((state) => state.setProcess);

  const [showModal, setShowModal] = useState<boolean>(false);

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

  const formik = useFormik({
    initialValues: {
      reviewerLetter: process?.reviewer_letter || false,
      reviewer: process?.reviewer_id || "",
    },
    validationSchema,
    onSubmit: () => {
      setShowModal(true);
    },
  });

  return (
    <>
      <div className="txt1">Etapa 3: Seleccionar Revisor</div>
      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReviewerSelect
              value={formik.values.reviewer}
              onChange={formik.handleChange}
              error={formik.touched.reviewer && Boolean(formik.errors.reviewer)}
              helperText={formik.touched.reviewer && formik.errors.reviewer}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="reviewerLetter"
                color="primary"
                checked={formik.values.reviewerLetter}
                onChange={formik.handleChange}
              />
            }
            label="Carta de Designación de Revisor Presentada"
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button variant="contained" color="secondary" onClick={onPrevious}>
            Anterior
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Siguiente
          </Button>
        </Box>
      </form>
      {showModal && (
        <ConfirmModal
          step={steps[2]}
          nextStep={steps[3]}
          setShowModal={setShowModal}
          onNext={handleModalAction}
        />
      )}
    </>
  );
};
