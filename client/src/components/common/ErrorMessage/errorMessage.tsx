import { ErrorMessage } from "formik";

export const FormErrorMessage = ({ name }: {name: string}) => {
    return (
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="dark:text-red-300 text-red-600 text-xs font-bold pt-2">
            {msg}
          </div>
        )}
      </ErrorMessage>
    );
  };