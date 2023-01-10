import { useNavigate } from './hooks/useNavigate';

const App = () => {
  const { currentStep, nextStep, previousStep } = useNavigate();

  return (
    <div>
      <button onClick={previousStep}>Wstecz</button>
      <button onClick={nextStep}>Dalej</button>

      <h1>counter: {currentStep}</h1>
    </div>
  );
};

export default App;
