interface IngredientProps {
  amount: number;
  measurement: number;
  name: string;
}

const Ingredient = ({ amount, measurement, name }: IngredientProps) => (
  <li>
    {amount} {measurement} {name}
  </li>
);

export default Ingredient;
