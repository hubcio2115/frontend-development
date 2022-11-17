import { createContext, useState, useContext, PropsWithChildren } from 'react';
import colorData from '../data/color-data.json';
import { v4 } from 'uuid';

export interface IColor {
  id: string;
  rating: number;
  title: string;
  color: string;
}

interface IColorContext {
  addColor: (title: string, colorValue: string) => void;
  removeColor: (id: string) => void;
  rateColor: (id: string, rating: number) => void;
  colors: IColor[];
}

const ColorContext = createContext<IColorContext>({
  addColor: () => {},
  removeColor: () => {},
  rateColor: () => {},
  colors: [],
});
export const useColors = () => useContext(ColorContext);

const ColorProvider = ({ children }: PropsWithChildren) => {
  const [colors, setColors] = useState<IColor[]>(colorData);

  const addColor = (title: string, colorValue: string) =>
    setColors([
      ...colors,
      {
        id: v4(),
        rating: 0,
        title,
        color: colorValue,
      },
    ]);

  const rateColor = (id: string, rating: number) =>
    setColors(
      colors.map((color) => (color.id === id ? { ...color, rating } : color)),
    );

  const removeColor = (id: string) =>
    setColors(colors.filter((color) => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
