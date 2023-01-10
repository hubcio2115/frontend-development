import { KeyboardEvent, useEffect, useState } from 'react';

export const useNavigate = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => (prev !== 0 ? prev - 1 : prev));
  };

  function listener(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        previousStep();
        break;

      case 'ArrowRight':
        nextStep();
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listener as unknown as EventListener);

    return () => {
      window.removeEventListener(
        'keydown',
        listener as unknown as EventListener
      );
    };
  }, []);

  return { currentStep, nextStep, previousStep };
};
