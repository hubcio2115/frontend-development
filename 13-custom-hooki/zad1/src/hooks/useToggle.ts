import { useState } from 'react';

export const useToggle = (): [boolean, () => void] => {
  const [toggleValue, setToggle] = useState(false);

  const toggle = () => setToggle((prev) => !prev);

  return [toggleValue, toggle];
};
