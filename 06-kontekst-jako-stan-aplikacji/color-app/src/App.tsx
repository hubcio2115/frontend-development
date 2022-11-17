import ColorList from './components/ColorList';
import AddColorForm from './components/AddColorForm';
import ColorProvider from './components/ColorProvider';
import './App.css';

const App = () => {
  return (
    <ColorProvider>
      <AddColorForm />
      <ColorList />
    </ColorProvider>
  );
};

export default App;
