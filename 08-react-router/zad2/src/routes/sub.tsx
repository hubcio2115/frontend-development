import { useSearchParams } from 'react-router-dom';

const Sub = () => {
  const [searchParams] = useSearchParams();

  return (
    <h1>
      {searchParams.has('x') && searchParams.has('y')
        ? `${
            parseInt(searchParams.get('x')!) - parseInt(searchParams.get('y')!)
          }`
        : 'x or y have no been provided'}
    </h1>
  );
};

export default Sub;
