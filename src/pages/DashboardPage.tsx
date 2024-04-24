import StatisticsCard from "../components/common/StatisticsCard";
import { FaUserGraduate } from "react-icons/fa";

const DashboardPage = () => {
    return <div className="pt-10">
        <h1>Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
            <StatisticsCard
                color="white"
                icon={<FaUserGraduate className="text-black h-full w-full" />}
                title="Procesos de Graduación"
                value="12"
            />
        </div>
    </div>
}

export default DashboardPage;