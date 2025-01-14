import React from "react";
import { useParams } from "react-router-dom";
import { Card, Text, Badge, Group, Button, Container, Stack } from "@mantine/core";

interface Payload {
  id: string;
  name: string;
  type: string;
  mass_kg: number;
  mass_lbs: number;
  orbit: string;
  reference_system: string;
  regime: string;
  customers: string[];
  nationalities: string[];
  manufacturers: string[];
  launch: string;
  dragon: {
    capsule: string | null;
    mass_returned_kg: number | null;
    mass_returned_lbs: number | null;
    flight_time_sec: number | null;
    manifest: string | null;
    water_landing: boolean | null;
    land_landing: boolean | null;
  };
}

const PayloadDetailCard: React.FC = () => {
  const { payloadId } = useParams<{ payloadId: string }>();

  // Assuming you fetch the payload data by payloadId
  const payloadData: Payload = {
    id: "5eb0e4b5b6c3bb0006eeb1e1",
    name: "FalconSAT-2",
    type: "Satellite",
    mass_kg: 20,
    mass_lbs: 43,
    orbit: "LEO",
    reference_system: "geocentric",
    regime: "low-earth",
    customers: ["DARPA"],
    nationalities: ["United States"],
    manufacturers: ["SSTL"],
    launch: "5eb87cd9ffd86e000604b32a",
    dragon: {
      capsule: null,
      mass_returned_kg: null,
      mass_returned_lbs: null,
      flight_time_sec: null,
      manifest: null,
      water_landing: null,
      land_landing: null,
    },
  };

  return (
    <Container size="sm">
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        style={{
          maxWidth: "500px",
          margin: "20px auto",
          backgroundColor: "#f8f9fa", // Subtle background
        }}
      >
        <Text align="center" size="xl" weight={600} style={{ color: "#333" }}>
          {payloadData.name}
        </Text>
        <Stack spacing="md" mt="lg">
          <Group position="apart">
            <Text size="md" weight={500}>
              Type:
            </Text>
            <Text size="md">{payloadData.type}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Mass (kg):
            </Text>
            <Text size="md">{payloadData.mass_kg}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Mass (lbs):
            </Text>
            <Text size="md">{payloadData.mass_lbs}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Orbit:
            </Text>
            <Text size="md">{payloadData.orbit}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Reference System:
            </Text>
            <Text size="md">{payloadData.reference_system}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Regime:
            </Text>
            <Text size="md">{payloadData.regime}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Customers:
            </Text>
            <Text size="md">{payloadData.customers.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Nationalities:
            </Text>
            <Text size="md">{payloadData.nationalities.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Manufacturers:
            </Text>
            <Text size="md">{payloadData.manufacturers.join(", ")}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Launch:
            </Text>
            <Text size="md">{payloadData.launch}</Text>
          </Group>
          {/* Dragon Data */}
          <Group position="apart">
            <Text size="md" weight={500}>
              Capsule:
            </Text>
            <Text size="md">{payloadData.dragon.capsule || "N/A"}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Mass Returned (kg):
            </Text>
            <Text size="md">{payloadData.dragon.mass_returned_kg || "N/A"}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Water Landing:
            </Text>
            <Text size="md">{payloadData.dragon.water_landing ? "Yes" : "No"}</Text>
          </Group>
          <Group position="apart">
            <Text size="md" weight={500}>
              Land Landing:
            </Text>
            <Text size="md">{payloadData.dragon.land_landing ? "Yes" : "No"}</Text>
          </Group>
        </Stack>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="lg"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            borderRadius: "8px",
            padding: "12px",
          }}
          onClick={() => window.history.back()} // Go back to previous page
        >
          Back
        </Button>
      </Card>
    </Container>
  );
};

export default PayloadDetailCard;
