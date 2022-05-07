
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { DcScreen } from '../components/dc/DcScreen';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
// import { MarvelScreen } from '../components/marvel/MarvelScreen';
// import { SearchScreen } from '../components/search/SearchScreen';
// import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
  return (<BrowserRouter>
        {/* <Navbar /> */}
            <Routes>
                {/* <Route path="/" element={<MarvelScreen />} />
                <Route path="/marvel" element={<MarvelScreen />} />
                <Route path="/dc" element={<DcScreen />} />
                <Route path="/search" element={<SearchScreen />} /> */}

                {/* <Route path="/login" element={<LoginScreen />} />
                <Route path="/*" element={<DashboardRoutes />} /> */}
                <Route path="/login" element={
                    <PublicRoute>
                      <LoginScreen />
                    </PublicRoute>
                  } 
                />
                <Route path="/*" element={
                  <PrivateRoute>
                    <DashboardRoutes />
                  </PrivateRoute>
                  } 
                />
            </Routes>
  </BrowserRouter>);
};
