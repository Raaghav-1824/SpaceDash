import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconNotes,
  IconPresentationAnalytics,
  IconRocket,
  IconSatellite,
  IconShip,
} from "@tabler/icons-react";
import { Code, Group, ScrollArea, NavLink, Box, Stack } from "@mantine/core";
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

  const links = apiRoutes.map((item) => (
    <NavLink
      key={item.label}
      label={item.label}
      icon={<item.icon size={18} />}
      onClick={() => navigate(item.link)}
      sx={{
        "&:hover": {
          backgroundColor: "#f0f4ff",
          color: "#1a73e8",
          borderRadius: "6px",
        },
      }}
    />
  ));

  return (
    <Box
      sx={{
        width: isOpen ? 280 : 0,
        height: "100vh",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
        display: "block",
        transition: "width 0.4s ease",
        padding: isOpen ? "20px" : "0",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Group position="apart" sx={{ marginBottom: "20px" }}>
        <Box sx={{ fontSize: 16, fontWeight: 500, color: "#1a73e8" }}>
          SpaceX
        </Box>
      </Group>

      <ScrollArea>
        <Stack spacing="sm">{links}</Stack>
      </ScrollArea>
    </Box>
  );
}
