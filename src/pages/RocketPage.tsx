import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { fetchApiData } from "../api/spaceXApi";
import RocketDetailCard from "../components/RocketDetailCard";

const RocketPage = () => {
  const { rocketId } = useParams<{ rocketId: string }>(); // Fetch rocketId from params

  const { data, error, isLoading } = useQuery({
    queryKey: ["rocket", rocketId],
    queryFn: () => fetchApiData(`rockets/${rocketId}`),
    enabled: !!rocketId, // Only fetch if rocketId is defined
  });
  
  console.log("Rocket Data:", data);

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
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
    <div style={{ padding: "2rem" }}>
      <RocketDetailCard rocket={data} />
    </div>
  );
};

export default RocketPage;
