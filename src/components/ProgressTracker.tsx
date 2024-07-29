import { FC, useState, useCallback } from "react";
import { InternalDefenseStage } from "./stages/InternalDefenseStage";
import { MentorStage } from "./stages/MentorStage";
import { RegistrationStage } from "./stages/RegistrationStage";
import { ReviewerStage } from "./stages/ReviewerStage";
import { ExternalDefenseStage } from "./stages/ExternalDefenseStage";
import { Seminar } from "../models/studentProcess";
import { steps } from "../data/steps";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

interface ProgressTrackerProps {
  currentStepIndex: number;
  status: string;
  studentProcess: Seminar;
}

const ProgressTracker: FC<ProgressTrackerProps> = ({ currentStepIndex, status }) => {
  const [currentStage, setCurrentStage] = useState(currentStepIndex);

  const goToNextStage = useCallback(() => {
    setCurrentStage((prevStage) => prevStage + 1);
  }, []);

  const goToPreviousStage = useCallback(() => {
    setCurrentStage((prevStage) => prevStage - 1);
  }, []);

  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return <RegistrationStage onNext={goToNextStage} />;
      case 1:
        return <MentorStage onNext={goToNextStage} onPrevious={goToPreviousStage} />;
      case 2:
        return <ReviewerStage onNext={goToNextStage} onPrevious={goToPreviousStage} />;
      case 3:
        return <InternalDefenseStage onPrevious={goToPreviousStage} onNext={goToNextStage} />;
      case 4:
        return <ExternalDefenseStage onPrevious={goToPreviousStage}/>;
    }
  };

  const handleStep = (step: number) => () => {
    setCurrentStage(step);
  };

  return (
    <Box className="bg-white m-5 p-5 shadow-md rounded-lg h-full">
      <Box className="flex items-center justify-between my-2 mx-5">
        <Typography variant="h4" className="font-semibold">Progreso</Typography>
        <Box className="flex items-center space-x-4 mx-5">
          <Typography variant="h6" className="font-semibold text-primary">
            Estado: <span className="text-red-1 font-medium">{status}</span>
          </Typography>
        </Box>
      </Box>
      <Stepper activeStep={currentStage} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index} completed={index < currentStage} onClick={handleStep(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box className="m-5 p-5 w-full">
        {renderStage()}
      </Box>
    </Box>
  );
};

export default ProgressTracker;