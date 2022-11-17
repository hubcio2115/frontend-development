import Recipe, { RecipeProps } from './Recipe';

interface MenuProps {
  recipes: RecipeProps[];
}

const Menu = ({ recipes }: MenuProps) => (
  <article>
    <header>
      <h1>Delicious Recipes</h1>
    </header>
    <div className="recipes">
      {recipes.map((recipe, i) => (
        <Recipe key={i} {...recipe} />
      ))}
    </div>
  </article>
);

export default Menu;
