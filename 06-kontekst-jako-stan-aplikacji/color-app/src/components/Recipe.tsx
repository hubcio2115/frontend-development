import IngredientsList, { IIngredient } from './IngredientList';
import Instructions from './Instructions';

export interface RecipeProps {
  name: string;
  ingredients: IIngredient[];
  steps: string[];
}

const Recipe = ({ name, ingredients, steps }: RecipeProps) => (
  <section id={name.toLowerCase().replace(/ /g, '-')}>
    <h1>{name}</h1>
    <IngredientsList list={ingredients} />
    <Instructions title="Cooking Instructions" steps={steps} />
  </section>
);

export default Recipe;
