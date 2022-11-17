import { ChangeEvent, useState } from 'react';

type IInput = [
  {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  },
  () => void,
];

export const useInput = (initialValue: string): IInput => {
  const [value, setValue] = useState(initialValue);

  return [
    {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    },
    () => setValue(initialValue),
  ];
};
