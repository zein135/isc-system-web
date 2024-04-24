import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfessorPage = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCreateTeacher = () => {
        navigate('/create-professor');
    }

    return <>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between m-10 mb-8 overflow-hidden">
            <label htmlFor="table-search" className="sr-only">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    type="text"
                    id="table-search"
                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar por nombre de Docente"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <button
                onClick={handleCreateTeacher}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Crear Docente
            </button>
        </div>

        {/* <Table
            data={filteredData}
            pageSize={pageSize}
            currentPage={currentPage}
            tableHeaders={tableHeaders}
            onPageChange={handlePageChange}
        /> */}
    </>
}

export default ProfessorPage;