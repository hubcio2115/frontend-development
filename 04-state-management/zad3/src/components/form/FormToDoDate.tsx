import { Dispatch, SetStateAction } from 'react';

interface FormToDoDateProps {
  setDate: Dispatch<SetStateAction<Date | null>>;
}

const FormToDoDate = ({ setDate }: FormToDoDateProps) => {
  const minDateTomorrow = new Date(new Date().getTime() + 86400000)
    .toISOString()
    .split('T')[0];

  return (
    <input
      type="date"
      required
      onChange={(e) => setDate(e.target.valueAsDate)}
      min={minDateTomorrow}
    />
  );
};

export default FormToDoDate;
