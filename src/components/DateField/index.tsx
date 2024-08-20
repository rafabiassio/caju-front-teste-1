import { InputHTMLAttributes, ChangeEvent, useState } from "react";
import { formatISOtoLocale } from "~/utils/formatters";
import TextField from "../TextField";

type DateFieldProps = {
  value: string;
  label?: string;
  error?: string;
  handleChange: (value: string) => void;
} & InputHTMLAttributes<any>;

const DateField = ({ value, handleChange, ...props }: DateFieldProps) => {
  const [localValue, setLocalValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setLocalValue(dateValue);

    const formattedLocale = formatISOtoLocale(dateValue)
    handleChange(formattedLocale);
  };

  return (
    <>
      <TextField
        {...props}
        type="date"
        value={localValue}
        onChange={onChange}
      />
    </>
  );
};

export default DateField;
