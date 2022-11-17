import Ingredient from './Ingredient';

export interface IIngredient {
  name: string;
  amount: number;
  measurement: number;
}

interface IngredientsListProps {
  list: IIngredient[];
}

const IngredientsList = ({ list }: IngredientsListProps) => (
  <ul className="ingredients">
    {list.map((ingredient, i) => (
      <Ingredient key={i} {...ingredient} />
    ))}
  </ul>
);

export default IngredientsList;
