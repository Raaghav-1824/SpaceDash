import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Center, Loader, Text, Container, Box } from "@mantine/core";
import { fetchApiData } from "../api/spaceXApi";
import RocketDetailCard from "../components/RocketDetailCard";

const RocketPage = () => {
  const { rocketId } = useParams<{ rocketId: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["rocket", rocketId],
    queryFn: () => fetchApiData(`rockets/${rocketId}`),
    enabled: !!rocketId,
  });

  if (isLoading) {
    return (
      <Center style={{ height: "calc(100vh - 60px)" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error || !data) {
    return (
      <Center>
        <Text color="red">
          Failed to fetch rocket details. Please try again.
        </Text>
      </Center>
    );
  }

  return (
    <Container
      fluid
      px={{ base: "xs", sm: "md", lg: "lg" }}
      py={{ base: "xs", sm: "md", lg: "lg" }}
      style={{
        marginTop: "56px", // Adjusted for fixed Navbar height
        width: "calc(100% - 15%)", // Subtract navbar width
        paddingTop: "80px", // Add extra padding for header
      }}
    >
      <Box style={{ maxWidth: "700px", width: "100%", margin: "auto" }}>
        <RocketDetailCard rocket={data} />
      </Box>
    </Container>
  );
};

export default RocketPage;
