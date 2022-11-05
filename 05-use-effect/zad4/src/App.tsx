import axios from 'axios';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import AddForm from './components/AddForm';
import type { FromSchemaType } from './components/AddForm';
import ProductList from './components/ProductList';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });

        const data = await res.json();

        const productsSchema = z.array(
          z.object({
            id: z.number().min(1),
            title: z.string(),
            price: z.number(),
            category: z.string(),
            description: z.string(),
            image: z.string().url(),
          }),
        );

        setProducts(productsSchema.parse(data));
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  const onSubmit = async (data: FromSchemaType) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const product = await res.json();

        setProducts([...products, product]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUniqCategoriesInProducts = (products: Product[]) => {
    const everyCategory = products.reduce((acc: string[], product) => {
      return [...acc, product.category];
    }, []);

    return [...new Set(everyCategory)];
  };

  return (
    <div>
      <AddForm
        onSubmit={onSubmit}
        productCategories={getUniqCategoriesInProducts(products)}
      />

      <ProductList products={products} />
    </div>
  );
};

export default App;
