import { ColorContext } from './context/ColorContext';
import PrimaryHeadline from './components/PrimaryHeadline';
import Paragraph from './components/Paragraph';
import SecondaryHeadline from './components/SecondaryHeadline';

const App = () => {
  return (
    <ColorContext.Provider value={'brown'}>
      <PrimaryHeadline />

      <Paragraph content="paragraph" />

      <SecondaryHeadline content="headline" />
    </ColorContext.Provider>
  );
};

export default App;
