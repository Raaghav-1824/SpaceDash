import React from "react";
import { Card, Text, Image, Badge, Button, Group, Center } from "@mantine/core";

interface LaunchDetailCardProps {
  launch: {
    id: string;
    name: string;
    date_utc: string;
    success: boolean;
    details: string | null;
    links: {
      patch: { small: string; large: string | null };
      webcast: string | null;
      wikipedia: string | null;
    };
    failures: { time: number; reason: string }[];
  };
}

const LaunchDetailCard: React.FC<LaunchDetailCardProps> = ({ launch }) => {
  const imageUrl = launch.links.patch.large || ""; // Fallback to an empty string

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Image Section */}
      <Card.Section>
        <Center>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={launch.name}
              height={280}
              width={280}
              style={{
                objectFit: "contain",
                borderRadius: "10px",
                border: "1px solid #eaeaea",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            />
          ) : (
            <Text>No image available</Text>
          )}
        </Center>
      </Card.Section>

      {/* Launch Name and Status */}
      <Group position="apart" mt="lg" mb="sm">
        <Text weight={700} size="lg" style={{ color: "#333" }}>
          {launch.name}
        </Text>
        <Badge color={launch.success ? "green" : "red"} variant="light" size="lg">
          {launch.success ? "Success" : "Failed"}
        </Badge>
      </Group>

      {/* Launch Date */}
      <Text size="sm" color="dimmed" style={{ marginBottom: "10px" }}>
        <strong>Launch Date:</strong> {new Date(launch.date_utc).toLocaleDateString()} |{" "}
        {new Date(launch.date_utc).toLocaleTimeString()}
      </Text>

      {/* Details Section */}
      <Text size="sm" color="#444" style={{ marginBottom: "15px", lineHeight: 1.5 }}>
        {launch.details || "No additional details available."}
      </Text>

      {/* Failure Reason */}
      {launch.failures.length > 0 && (
        <Text size="sm" color="red" style={{ marginBottom: "15px" }}>
          <strong>Failure Reason:</strong> {launch.failures[0].reason}
        </Text>
      )}

      {/* Webcast and Wikipedia Links */}
      <Group position="center" mt="md">
        {launch.links.webcast && (
          <Button
            variant="outline"
            color="blue"
            onClick={() => window.open(launch.links.webcast as string, "_blank")}
          >
            Watch Webcast
          </Button>
        )}
        {launch.links.wikipedia && (
          <Button
            variant="outline"
            color="gray"
            onClick={() => window.open(launch.links.wikipedia as string, "_blank")}
          >
            View Wikipedia
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default LaunchDetailCard;
