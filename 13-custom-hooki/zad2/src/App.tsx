import { useFetch } from './hooks/useFetch';

const App = () => {
  const { data, isLoading, error } = useFetch();

  return (
    <div>
      {!isLoading && (
        <div>
          {!!error.message && <p>{error.message}</p>}
          {!!data && !!data.length && (
            <div>
              {data.map((el) => (
                <pre>{el.title}</pre>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
