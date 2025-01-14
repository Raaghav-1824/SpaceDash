import React from "react";
import {
  Grid,
  Card,
  Image,
  Text,
  Group,
  Box,
  Badge,
  Button,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarNested } from "../../components/Navbar/NavbarNested";
import { HeaderSearch } from "../../components/Header/HeaderSearch";

export function Homepage() {
  const [opened, { toggle }] = useDisclosure(false);

  const features = [
    {
      title: "Rockets",
      description: "View details about all rockets.",
      link: "/resources/rockets",
      image: "/assets/Rocket-spaceX.jpg",
    },
    {
      title: "Launches",
      description: "Upcoming and past launches.",
      link: "/resources/launches",
      image: "/assets/launches-spaceX.jpg",
    },
    {
      title: "Missions",
      description: "Explore mission details.",
      link: "/resources/missions",
      image: "/assets/sapceX-missions.jpg",
    },
    {
      title: "Payloads",
      description: "Payload information.",
      link: "/resources/payloads",
      image: "/assets/payload.jpg",
    },
    {
      title: "Launchpads",
      description: "Details about launch sites.",
      link: "/resources/launchpads",
      image: "/assets/launchPad.jpg",
    },
    {
      title: "Starlink",
      description: "Explore Starlink data.",
      link: "/resources/starlink",
      image: "/assets/starlink.jpg",
    },
  ];

  const getFallbackImage = (image: string) => {
    return image ? image : "/images/fallback-image.jpg"; 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header Component */}
      <HeaderSearch toggleNavbar={toggle} isNavbarOpen={closed} />

      {/* Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Navbar */}
        <NavbarNested isOpen={opened} />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: "15px" }}>
          {/* Welcome Text */}
          <Text size="xl" weight={300} mb="10px" color="#343a40">
            Dashboard
          </Text>

          {/* Feature Cards */}
          <Grid gutter="lg">
            {features.map((feature, index) => (
              <Grid.Col xs={12} sm={6} md={4} key={index}>
                <Card
                  shadow="lg"
                  radius="lg"
                  withBorder
                  sx={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Card.Section>
                    <Image
                      src={getFallbackImage(feature.image)}
                      height={200}
                      alt={feature.title}
                      sx={{
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        width: "100%",
                      }}
                    />
                  </Card.Section>
                  <Group position="apart" mt="md">
                    <Text weight={400} size="lg">
                      {feature.title}
                    </Text>
                  </Group>
                  <Text size="sm" color="dimmed" mt="xs">
                    {feature.description}
                  </Text>
                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    component="a"
                    href={feature.link}
                  >
                    Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
