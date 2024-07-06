import { setIn, useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";
import { Box, Grid } from "@mui/material";
import ReviewerSelect from "../selects/ReviewerSelect";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDefenseInternalDetail } from "../../hooks/useDefenseInternalDetail";
import dayjs, { Dayjs } from "dayjs";
import { useProcessStore } from "../../store/store";

const DEFENSE_EXTERNAL = "external";

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

  const [, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const process = useProcessStore((state) => state.process);
  const setProcess = useProcessStore((state) => state.setProcess);
  const defenseDetail = useDefenseInternalDetail(process?.id || 0);
  const [initialValues, setInitialValues] = useState<any>({
    president: "",
    firstJuror: "",
    secondJuror: "",
    date: dayjs(),
  });

  useEffect(() => {

    if (defenseDetail) {
      setInitialValues({
        president: defenseDetail.president?.toString() || "",
        secretary: defenseDetail.secretary?.toString() || "",
        date: defenseDetail.date ? dayjs(defenseDetail.date) : dayjs(),
      });
    }
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
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowModal(true);
      //onNext();
    },
  });

  const handleDateChange = (value: Dayjs | null) => {
    formik.setFieldValue("date", value);
  };

  return (
    <>
      <div className="txt1">Etapa Final: Defensa Externa</div>

      <form onSubmit={formik.handleSubmit} className="mx-16 ">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.president}
                onChange={formik.handleChange}
                error={
                  formik.touched.president && Boolean(formik.errors.president)
                }
                label={"Seleccione un presidente"}
                name="president"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.president}
                onChange={formik.handleChange}
                error={
                  formik.touched.president && Boolean(formik.errors.president)
                }
                label={"Seleccione un presidente"}
                name="president"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReviewerSelect
                value={formik.values.president}
                onChange={formik.handleChange}
                error={
                  formik.touched.president && Boolean(formik.errors.president)
                }
                label={"Seleccione un presidente"}
                name="president"
              />
            </Grid>
            <Grid item xs={12} sm={6} marginTop={7}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Asignación de Tutor"
                  value={formik.values.date}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
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
