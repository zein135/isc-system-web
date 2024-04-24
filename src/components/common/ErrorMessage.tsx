import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-1 text-xs font-medium mt-1">{message}</div>;
};
