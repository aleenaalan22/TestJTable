import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout'

function App() {
  return (
    <header >
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </header>
  );
}

export default App;
