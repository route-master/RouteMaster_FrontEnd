import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from 'components/Layout/Layout';
import Calculation from 'pages/Calculation/Calculation';
import CalculationDetail from 'pages/Calculation/Detail/Detail';
import HotelDetails from 'pages/AttractionsDetails/Hotel/Details';
import RestaurantDetails from 'pages/AttractionsDetails/Restaurant/Details';
import Main from 'pages/Main/Main';
import Plan from 'pages/Plan/Plan';
import Attractions from 'pages/Attractions/Attractions';
import Auth from 'pages/Auth/Auth';
import CheckProfile from 'pages/CheckProfile/CheckProfile';
import SetProfile from 'pages/SetProfile/SetProfile';
import PlanList from 'pages/PlanList/PlanList';
import EventDetails from 'pages/AttractionsDetails/Event/Details';
import Logout from 'pages/Logout/logout';
import Invite from 'pages/Invite/Invite';

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
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/check_profile" element={<CheckProfile />} />
          <Route path="/invite/:planGroupId" element={<Invite />} />
        </Routes>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/set_profile" element={<SetProfile />} />
            <Route path="/plan-list" element={<PlanList />} />
            <Route path="/plan-list/plan/:planGroupId" element={<Plan />} />
            <Route path="/attractions/:pagetype" element={<Attractions />} />
            <Route
              path="/attractions/:pagetype/:keyword"
              element={<Attractions />}
            />
            <Route
              path="attractions/stay/details/:id"
              element={<HotelDetails />}
            />
            <Route
              path="/attractions/event/details/:id"
              element={<EventDetails />}
            />
            <Route
              path="/attractions/restaurant/details/:id"
              element={<RestaurantDetails />}
            />
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
