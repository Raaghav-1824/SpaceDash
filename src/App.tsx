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
import ResourceDetail from "./pages/resources/ResourceDetails";
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
        <Route
          path="/resources/:endpoint/:id"
          element={
            <PrivateRoute>
              <ResourceDetail />
            </PrivateRoute>
          }
        />
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

        {/* Update to handle both payload and launch details */}
        <Route
          path="/payload/:payloadId"
          element={
            <PrivateRoute>
              <PayloadDetailCard />
            </PrivateRoute>
          }
        />

        {/* Home Route */}
        <Route path="/" element={<Homepage />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MantineProvider>
  );
}

export const fetchApiData = async (endpoint: string, id?: string) => {
  const url = id
    ? `https://api.spacexdata.com/v4/${endpoint}/${id}` // Fetch details of a specific item by ID
    : `https://api.spacexdata.com/v4/${endpoint}`; // Fetch list of items

  console.log("Fetching URL:", url); 

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
