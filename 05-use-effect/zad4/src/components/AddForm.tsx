import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const validationSchema = z.object({
  title: z.string({
    invalid_type_error: 'Please insert the title of the product.',
  }),
  price: z
    .number({ invalid_type_error: 'Please insert a valid number format' })
    .positive({ message: 'Price must be positive' }),
  category: z.string({
    invalid_type_error: 'Please insert a valid category format',
  }),
  description: z.string({
    invalid_type_error: 'Please insert a valid description format',
  }),
  image: z.string({
    invalid_type_error: 'Please insert a valid image format',
  }),
});

export type FromSchemaType = z.infer<typeof validationSchema>;

interface AddFormProps {
  productCategories: string[];
  onSubmit: (data: FromSchemaType) => Promise<void>;
}

const AddForm = ({ productCategories, onSubmit }: AddFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromSchemaType>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="title"
        {...register('title', { required: true })}
      />
      {errors.title ? <p>{errors.title.message}</p> : <></>}

      <input
        type="number"
        placeholder="price"
        {...register('price', { required: true, valueAsNumber: true })}
      />
      {errors.price ? <p>{errors.price.message}</p> : <></>}

      <select placeholder="category" {...register('category')}>
        {productCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="description"
        {...register('description', { required: true })}
      />
      {errors.description ? <p>{errors.description.message}</p> : <></>}

      <input
        type="text"
        placeholder="image"
        {...register('image', { required: true })}
      />
      {errors.image ? <p>{errors.image.message}</p> : <></>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
