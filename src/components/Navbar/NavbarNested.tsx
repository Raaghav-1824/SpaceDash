import React from "react";
import {
  IconNotes,
  IconGauge,
  IconRocket,
  IconFileAnalytics,
  IconCalendarStats,
  IconShip,
  IconSatellite,
} from "@tabler/icons-react";
import { Box, Group, ScrollArea, NavLink, Stack, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const apiRoutes = [
  {
    label: "Company Info",
    icon: IconNotes,
    link: "/company-info",
    endpoint: "company",
  },
  { label: "Crew", icon: IconGauge, link: "/resources/crew", endpoint: "crew" },
  {
    label: "Rockets",
    icon: IconRocket,
    link: "/resources/rockets",
    endpoint: "rockets",
  },
  {
    label: "Payloads",
    icon: IconFileAnalytics,
    link: "/resources/payloads",
    endpoint: "payloads",
  },
  {
    label: "Launches",
    icon: IconCalendarStats,
    link: "/resources/launches",
    endpoint: "launches",
  },
  {
    label: "Dragons",
    icon: IconRocket,
    link: "/resources/dragons",
    endpoint: "dragons",
  },
  {
    label: "Landpads",
    icon: IconShip,
    link: "/resources/landpads",
    endpoint: "landpads",
  },
  {
    label: "Launchpads",
    icon: IconShip,
    link: "/resources/launchpads",
    endpoint: "launchpads",
  },
  {
    label: "Roadster Info",
    icon: IconNotes,
    link: "/roadster",
    endpoint: "roadster",
  },
  {
    label: "Ships",
    icon: IconShip,
    link: "/resources/ships",
    endpoint: "ships",
  },
  {
    label: "Starlink",
    icon: IconSatellite,
    link: "/resources/starlink",
    endpoint: "starlink",
  },
  {
    label: "Capsules",
    icon: IconRocket,
    link: "/resources/capsules",
    endpoint: "capsules",
  },
  {
    label: "Cores",
    icon: IconFileAnalytics,
    link: "/resources/cores",
    endpoint: "cores",
  },
];

export function NavbarNested({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // position: "fixed",
        // top: "60px", // Adjust based on header height
        // left: 0,
        // bottom: 0,
        // width: isNavbarOpen ? "20%" : "0", // Adjust width based on navbar toggle state
        // transition: "width 0.3s ease", // Smooth transition when toggling
        // zIndex: 999, // Ensure it's below the header
        // backgroundColor: "white",
        // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow
        display:"flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Navbar content */}

      <ScrollArea style={{ height: "100%" , padding:"20px" }}>
        <Stack>
          {apiRoutes.map((route, index) => (
            <NavLink
              key={index}
              label={route.label}
              icon={<route.icon />}
              onClick={() => navigate(route.link)}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
}
