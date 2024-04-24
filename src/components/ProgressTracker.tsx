import { FC, useState } from "react";
import { InternalDefenseStage } from "./stages/InternalDefenseStage";
import { MentorStage } from "./stages/MentorStage";
import { RegistrationStage } from "./stages/RegistrationStage";
import { ReviewerStage } from "./stages/ReviewerStage";
import { ExternalDefenseStage } from "./stages/ExternalDefenseStage";
import { Seminar } from "../models/studentProcess";
import SpinModal from "./common/SpinModal";
import { steps } from "../data/steps";
interface ProgressTrackerProps { 
  currentStepIndex: number;
  status: string;
  studentProcess: Seminar;
}



const ProgressTracker:FC<ProgressTrackerProps> = ({ currentStepIndex, status }) => {
  const [progressWidth, setProgressWidth] = useState((currentStepIndex / (steps.length - 1)) * 100);
  const [currentStage, setCurrentStage] = useState(currentStepIndex);

  const goToNextStage = () => {
    setCurrentStage((prevStage: number) => prevStage + 1);
    setProgressWidth(((currentStage + 1) / (steps.length - 1)) * 100);
  };

  const goToPreviousStage = () => {
    setCurrentStage((prevStage: number) => prevStage - 1);
    setProgressWidth(((currentStage - 1) / (steps.length - 1)) * 100);
  };

  const goToResume = () => {
    setCurrentStage((prevStage: number) => prevStage + 1);
  }

  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return <RegistrationStage onNext={goToNextStage}/>;
      case 1:
        return (
          <MentorStage onNext={goToNextStage} onPrevious={goToPreviousStage} />
        );
      case 2:
        return (
          <ReviewerStage
            onNext={goToNextStage}
            onPrevious={goToPreviousStage}
          />
        );
      case 3:
        return (
          <InternalDefenseStage
            onPrevious={goToPreviousStage}
            onNext={goToNextStage}
          />
        );
      case 4:
        return (
          <ExternalDefenseStage
            onPrevious={goToPreviousStage}
            onNext={goToResume}
          />
        );
      default:
        return <SpinModal/>;
    }
  };

  return (
    <div className="bg-white m-5 p-5 shadow-md rounded-lg h-full">
      <div className="flex items-center justify-between my-2 mx-5">
        <h2 className="text-3xl font-semibold">Progreso</h2>
        <div className="flex items-center space-x-4 mx-5">
          <p className="text-xl font-semibold text-primary">
            Estado: <span className="text-red-1 font-medium">{status}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center m-5 p-5 w-full">
        <div className="relative w-4/5">
          <div className="absolute w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="absolute bg-blue-2 h-1.5 rounded-full"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          {steps.map((step: string, index: number) => (
            <div
              key={step}
              className={`absolute -translate-y-1/2 ${
                index <= currentStage ? "bg-blue-2" : "bg-gray-200"
              } border-2 border-blue-2 rounded-full`}
              style={{
                left: `${(index / (steps.length - 1)) * 100}%`,
                width: "24px",
                height: "24px",
                marginTop: "0px",
                marginLeft: "-12px",
              }}
            >
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 text-xs text-center text-primary my-5"
                style={{
                  top: "100%",
                  left: "50%",
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      {renderStage()}
    </div>
  );
};

export default ProgressTracker;
