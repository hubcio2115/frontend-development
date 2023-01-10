import { useState } from 'react';
import { useToggle } from './hooks/useToggle';

const App = () => {
  const [toggleValue, toggle] = useToggle();

  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {toggleValue && <h1>Toggle</h1>}
    </div>
  );
};

export default App;
