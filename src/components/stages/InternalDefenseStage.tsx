import { FC, useState, useEffect } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import pdfFile from "../../assets/Acta_Defensa_Interna_de_Seminario_de_Grado_V1.1.pdf";
import { modifyPdf, PDFInsertData } from "../../utils/pdfEditor";
import { downloadFile } from "../../utils/files";
import { useProcessStore } from "../../store/store";
import { postDefenseDetail } from "../../services/defenseDetail";
import { updateProcess } from "../../services/processServicer";
import { useDefenseInternalDetail } from "../../hooks/useDefenseInternalDetail";
import ReviewerSelect from "../selects/ReviewerSelect";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const DEFENSE_INTERNAL = "internal";

interface InternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const InternalDefenseStage: FC<InternalDefenseStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({
    president: "",
    firstJuror: "",
    secondJuror: "",
    date: "",
  }); // Estado temporal para almacenar los valores iniciales del formulario
  const process = useProcessStore((state) => state.process);
  const setProcess = useProcessStore((state) => state.setProcess);
  const defenseDetail = useDefenseInternalDetail(process?.id || 0);

  useEffect(() => {
    if (defenseDetail) {
      setInitialValues({
        president: defenseDetail.president?.toString() || "",
        firstJuror: defenseDetail.first_juror?.toString() || "",
        secondJuror: defenseDetail.second_juror?.toString() || "",
        date: defenseDetail.date || "",
      });
    }
  }, [defenseDetail]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      president: Yup.string().required("* Debe agregar un presidente"),
      firstJuror: Yup.string().required("* Debe agregar un primer jurado"),
      secondJuror: Yup.string().required("* Debe agregar un segundo jurado"),
      date: Yup.string().required("* Debe seleccionar una fecha"),
    }),
    onSubmit: (values) => {
      setFormValues(values);
      setShowModal(true);
    },
  });

  const downloadEditedPDF = async (values: any) => {
    try {
      const [year, month, day] = values.date.split("-");

      const data: PDFInsertData[] = [
        { x: 195, y: 204.1, size: 10, text: day },
        { x: 222, y: 204.1, size: 10, text: month },
        { x: 245, y: 204.1, size: 10, text: year },
        { x: 222, y: 293, size: 10, text: values.president },
      ];

      const pdfArrayBuffer = await fetch(pdfFile).then((res) =>
        res.arrayBuffer()
      );
      const modifiedPdf = await modifyPdf(pdfArrayBuffer, data);
      const pdfBlob = new Blob([modifiedPdf], { type: "application/pdf" });

      downloadFile(
        pdfBlob,
        "Acta_Defensa_Interna_de_Seminario_de_Grado_V1.1.pdf"
      );

      onNext();
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  const saveStage = async (values: any) => {
    if (process) {
      const defenseDetail = {
        graduation_process_id: process.id,
        president: Number(values.president),
        first_juror: Number(values.firstJuror),
        second_juror: Number(values.secondJuror),
      };
      await postDefenseDetail(process.id, {
        ...defenseDetail,
        type: DEFENSE_INTERNAL,
      });
      process.stage_id = 4;
      setProcess(process);
      await updateProcess(process);
      onNext();
    }
  };

  const handleModalAction = async () => {
    if (formValues) {
      await saveStage(formValues);
      await downloadEditedPDF(formValues);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="txt1">Etapa 4: Defensa Interna</div>
      <form onSubmit={formik.handleSubmit} className="mx-16">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.president}
                onChange={formik.handleChange}
                error={
                  formik.touched.president && Boolean(formik.errors.president)
                }
                helperText={formik.touched.president && formik.errors.president}
                label={"Seleccione un presidente"}
                name="president"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.firstJuror}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstJuror && Boolean(formik.errors.firstJuror)
                }
                helperText={
                  formik.touched.firstJuror && formik.errors.firstJuror
                }
                label={"Seleccione 1er Jurado"}
                name="firstJuror"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.secondJuror}
                onChange={formik.handleChange}
                error={
                  formik.touched.secondJuror &&
                  Boolean(formik.errors.secondJuror)
                }
                helperText={
                  formik.touched.secondJuror && formik.errors.secondJuror
                }
                label={"Seleccione 2do Jurado"}
                name="secondJuror"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                name="date"
                label="Seleccione una fecha"
                type="date"
                margin="normal"
                fullWidth
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="space-between" pt={5}>
          <Button
            type="button"
            onClick={onPrevious}
            variant="contained"
            color="secondary"
          >
            Anterior
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Siguiente
          </Button>
        </Box>
      </form>
      {showModal && (
        <ConfirmModal
          step={steps[3]}
          nextStep={steps[4]}
          setShowModal={setShowModal}
          onNext={handleModalAction}
        />
      )}
    </>
  );
};