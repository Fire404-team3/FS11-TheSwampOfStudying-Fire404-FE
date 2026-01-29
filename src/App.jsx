import { BrowserRouter } from 'react-router';
import './App.css';
import Home from './domains/home/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
