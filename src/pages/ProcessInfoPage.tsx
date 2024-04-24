import { useLoaderData } from "react-router-dom";
import Checklist from "../components/Checklist";
import ProgressTracker from "../components/ProgressTracker";
import { getStage } from "../helper/process";
import { Seminar } from "../models/studentProcess";
import { useProcessStore } from "../store/store"; 

const ProcessInfoPage = () => {
  const updateProcess = useProcessStore(state => state.setProcess)
  const process = useLoaderData() as {data: Seminar};
  const { data } = process;
  updateProcess(data);
  
  const stageProcess = getStage(data);
  
  return (
    <div className="flex flex-row w-full pt-10 p-4 h-full bg-[#D9E8F3] ">
      <div className="w-full lg:w-2/3 flex flex-col overflow-auto">
        <ProgressTracker
          currentStepIndex={stageProcess}
          status={"Revisor"}
          studentProcess={data}      
        />
      </div>
      <div className="hidden lg:block w-1/3 flex-col mb-10">
        <Checklist process={data} />
      </div>
    </div>
  );
};

export default ProcessInfoPage;
