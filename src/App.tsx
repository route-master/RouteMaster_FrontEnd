import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import Login from './pages/login';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
