import type { Product } from '../App';
import { v4 } from 'uuid';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div>
      {products.map((product) => (
        <pre key={v4()}>{JSON.stringify(product)}</pre>
      ))}
    </div>
  );
};

export default ProductList;
