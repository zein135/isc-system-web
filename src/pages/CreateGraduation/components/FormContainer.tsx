interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div className="flex flex-col items-center w-full pt-10 p-4 h-full bg-[#D9E8F3]">
    <div className="bg-white lg:w-1/2 m-10 p-5 shadow-md rounded-lg h-full md:w-2/3 sm:w-full">
      {children}
    </div>
  </div>
);
