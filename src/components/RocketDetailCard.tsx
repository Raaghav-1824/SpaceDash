import React from "react";
import { Card, Text, Image, Badge, Stack, Group } from "@mantine/core";

interface RocketDetailProps {
  rocket: any; // Use the appropriate type if you have one
}

const RocketDetailCard: React.FC<RocketDetailProps> = ({ rocket }) => {
  return (
    <Card shadow="lg" padding="xl" radius="lg" withBorder>
      <Stack spacing="lg">
        {/* Rocket Name */}
        <Text size="xl" weight={900} align="center" style={{ marginBottom: "1rem" }}>
          {rocket.name}
        </Text>

        {/* Images */}
        <Group spacing="lg" position="center">
          {rocket.flickr_images.map((image: string, index: number) => (
            <Image
              key={index}
              src={image}
              alt={rocket.name}
              height={350}
              width={450}
              radius="md"
              withPlaceholder
            />
          ))}
        </Group>

        {/* Description */}
        <Text size="md" style={{ lineHeight: 1.8, textAlign: "justify" }}>
          {rocket.description}
        </Text>

        {/* Rocket Details */}
        <Group position="center" spacing="lg">
          <Badge
            color="blue"
            radius="xl"
            size="lg"
            style={{ height: "40px", width: "auto", padding: "0 16px", fontSize: "1rem" }}
          >
            Active: {rocket.active ? "Yes" : "No"}
          </Badge>
          <Badge
            color="green"
            radius="xl"
            size="lg"
            style={{ height: "40px", width: "auto", padding: "0 16px", fontSize: "1rem" }}
          >
            Stages: {rocket.stages}
          </Badge>
          <Badge
            color="pink"
            radius="xl"
            size="lg"
            style={{ height: "40px", width: "auto", padding: "0 16px", fontSize: "1rem" }}
          >
            Boosters: {rocket.boosters}
          </Badge>
          <Badge
            color="yellow"
            radius="xl"
            size="lg"
            style={{ height: "40px", width: "auto", padding: "0 16px", fontSize: "1rem" }}
          >
            Success Rate: {rocket.success_rate_pct}%
          </Badge>
        </Group>

        <Group position="center" spacing="xl">
          <Text>
            <strong>First Flight:</strong> {rocket.first_flight}
          </Text>
          <Text>
            <strong>Country:</strong> {rocket.country}
          </Text>
          <Text>
            <strong>Company:</strong> {rocket.company}
          </Text>
        </Group>

        {/* Wikipedia Link */}
        {rocket.wikipedia && (
          <Text align="center" style={{ marginTop: "1.5rem" }}>
            <a href={rocket.wikipedia} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", color: "#007BFF", textDecoration: "none" }}>
              Learn More
            </a>
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default RocketDetailCard;
