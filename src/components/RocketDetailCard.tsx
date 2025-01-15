import React from "react";
import { Card, Text, Image, Badge, Stack, Group } from "@mantine/core";

interface RocketDetailProps {
  rocket: any;
}

const RocketDetailCard: React.FC<RocketDetailProps> = ({ rocket }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        marginBottom: "1.5rem",
        maxWidth: "700px", // Limit max width for the card
        width: "100%", // Ensure it takes full available width but doesn't exceed maxWidth
        margin: "auto", // Center card horizontally
      }}
    >
      <Stack spacing="lg">
        <Text
          size="xl"
          weight={700}
          align="center"
          style={{ marginBottom: "1rem", fontSize: "1.25rem" }} // Slightly reduced font size
        >
          {rocket.name}
        </Text>

        <Group spacing="md" position="center" style={{ flexWrap: "wrap" }}>
          {rocket.flickr_images.map((image: string, index: number) => (
            <Image
              key={index}
              src={image}
              alt={rocket.name}
              height={250} // Reduced image height
              width={300} // Reduced image width
              radius="md"
              withPlaceholder
            />
          ))}
        </Group>

        <Text size="md" style={{ lineHeight: 1.6, textAlign: "justify" }}>
          {rocket.description}
        </Text>

        <Group position="center" spacing="lg" style={{ flexWrap: "wrap" }}>
          <Badge
            color="blue"
            radius="xl"
            size="md"
            style={{
              height: "30px", // Reduced height of badges
              padding: "0 12px",
              fontSize: "0.875rem", // Slightly reduced font size
            }}
          >
            Active: {rocket.active ? "Yes" : "No"}
          </Badge>
          <Badge
            color="green"
            radius="xl"
            size="md"
            style={{
              height: "30px",
              padding: "0 12px",
              fontSize: "0.875rem",
            }}
          >
            Stages: {rocket.stages}
          </Badge>
          <Badge
            color="pink"
            radius="xl"
            size="md"
            style={{
              height: "30px",
              padding: "0 12px",
              fontSize: "0.875rem",
            }}
          >
            Boosters: {rocket.boosters}
          </Badge>
          <Badge
            color="yellow"
            radius="xl"
            size="md"
            style={{
              height: "30px",
              padding: "0 12px",
              fontSize: "0.875rem",
            }}
          >
            Success Rate: {rocket.success_rate_pct}%
          </Badge>
        </Group>

        <Group position="center" spacing="xl" style={{ flexWrap: "wrap" }}>
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

        {rocket.wikipedia && (
          <Text align="center" style={{ marginTop: "1.5rem" }}>
            <a
              href={rocket.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: "bold",
                color: "#007BFF",
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default RocketDetailCard;
