import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from 'components/Layout/Layout';
import Calculation from 'pages/Calculation/Calculation';
import CalculationDetail from 'pages/Calculation/Detail/Detail';
import Profile from 'pages/Profile/Profile';
import HotelDetails from 'pages/AttractionsDetails/Hotel/Details';
import Main from 'pages/Main/Main';
import Plan from 'pages/Plan/Plan';
import Attractions from 'pages/Attractions/Attractions';
import Auth from 'pages/Auth/Auth';
import CheckProfile from 'pages/CheckProfile/CheckProfile';
import SetProfile from 'pages/SetProfile/SetProfile';
import PlanList from 'pages/PlanList/PlanList';
import EventDetails from 'pages/AttractionsDetails/Event/Details';
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
          <Route path="/login" element={<Auth />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/check_profile" element={<CheckProfile />} />
          <Route path="/set_profile" element={<SetProfile />} />
        </Routes>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/plan-list" element={<PlanList />} />
            <Route path="/plan-list/plan/:planGroupId" element={<Plan />} />
            <Route path="/attractions/:pagetype" element={<Attractions />} />
            <Route path="/calculate/:id" element={<Calculation />} />
            <Route
              path="/calculate/:id/:name"
              element={<CalculationDetail />}
            />
            <Route
              path="/attractions/stay/details/:id"
              element={<HotelDetails />}
            />
            <Route
              path="/attractions/event/details/:id"
              element={<EventDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
