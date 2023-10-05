import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from 'components/Layout/Layout';
import Main from 'pages/Main/Main';
import Calculation from 'pages/Calculation/Calculation';
import CalculationDetail from 'pages/Calculation/Detail/Detail';
import Profile from 'pages/Profile/Profile';
import HotelDetails from 'pages/AttractionsDetails/Hotel/Details';
import Login from 'pages/login';
import PlanList from 'pages/plan-list';
import Plan from 'pages/Plans/Plan';
import Attractions from 'pages/Attractions/Attractions';
import Restaurant from './pages/AttractionsDetails/Restaurant';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/plan-list" element={<PlanList />} />
            <Route path="/plan-list/plan" element={<Plan />} />
            <Route path="/attractions/:pagetype" element={<Attractions />} />
            <Route path="/calculate/:id" element={<Calculation />} />
            <Route
              path="/calculate/:id/:name"
              element={<CalculationDetail />}
            />
            <Route path="/restaurants" element={<Restaurant />} />
            <Route
              path="attractions/stay/details/:id"
              element={<HotelDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
