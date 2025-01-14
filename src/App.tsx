import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
import useAuthStore from "./store/app.store";

// Pages
import RocketPage from "./pages/RocketPage";
import { CompanyInfo } from "./components/CompanyInfo";
import LoginPage from "./pages/auth/Login";
import ResourceList from "./pages/resources/ResourceList";
// import ResourceDetail from "./pages/resources/ResourceDetails";
import { NavbarNested } from "./components/Navbar/NavbarNested";
import { Homepage } from "./pages/landing/Homepage";
import ReusableTable from "./components/Table/ReusableTable";
import LaunchDetailPage from "./pages/DetailPage/LaunchDetailPage";
import PayloadDetailCard from "./components/PayloadDetailCard";


// PrivateRoute Component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes */}
        <Route
          path="/resources/:endpoint"
          element={
            <PrivateRoute>
              <ResourceList />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/resources/:endpoint/:id"
          element={
            <PrivateRoute>
              <ResourceDetail />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/launch-details/:id"
          element={
            <PrivateRoute>
              <LaunchDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/company-info"
          element={
            <PrivateRoute>
              <CompanyInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/rocket/:rocketId"
          element={
            <PrivateRoute>
              <RocketPage />
            </PrivateRoute>
          }
        />

        <Route path="/payload/:payloadId" element={<PayloadDetailCard />} />

        {/* Home Route */}
        <Route path="/" element={<Homepage />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MantineProvider>
  );
}
