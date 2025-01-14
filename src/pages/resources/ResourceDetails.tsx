import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Text,
  Loader,
  Card,
  Button,
  Group,
  Accordion,
  Stack,
  Divider,
} from '@mantine/core';

type LaunchDetail = {
  name: string;
  date_utc: string;
  rocket: string;
  details?: string;
  payloads: string[];
  links?: {
    webcast?: string;
    wikipedia?: string;
    article?: string;
  };
};

type PayloadDetail = {
  type: string;
  orbit: string;
};

const fetchLaunchDetail = async (id: string): Promise<LaunchDetail> => {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch launch details');
  }
  return res.json();
};

const fetchPayloadDetail = async (id: string): Promise<PayloadDetail> => {
  const res = await fetch(`https://api.spacexdata.com/v4/payloads/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch payload details');
  }
  return res.json();
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch launch details
  const {
    data: launchData,
    error: launchError,
    isLoading: isLoadingLaunch,
  } = useQuery(['launchDetail', id], () => fetchLaunchDetail(id!), {
    enabled: Boolean(id),
  });

  // Fetch payload details only after launchData is loaded
  const {
    data: payloadData,
    isLoading: isLoadingPayload,
  } = useQuery(
    ['payloadDetail', launchData?.payloads?.[0]],
    () => fetchPayloadDetail(launchData!.payloads[0]),
    { enabled: Boolean(launchData?.payloads?.[0]) }
  );

  // Handle loading and error states
  if (isLoadingLaunch || isLoadingPayload) return <Loader size="xl" mt="xl" />;
  if (launchError instanceof Error) return <Text color="red">{launchError.message}</Text>;

  // Handle the case when launchData is undefined
  if (!launchData) {
    return <Text color="red">Launch data is not available</Text>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Text align="center" size="xl" weight={700} mb="xl">
        Launch Details
      </Text>

      <Card shadow="lg" padding="xl" radius="lg" withBorder>
        <Stack spacing="md">
          <Text size="lg">
            <strong>Mission Name:</strong> {launchData?.name}
          </Text>
          <Text size="lg">
            <strong>Launch Date:</strong>{' '}
            {launchData.date_utc
              ? new Date(launchData.date_utc).toLocaleDateString()
              : 'No launch date available'}
          </Text>
          {payloadData && (
            <>
              <Text size="lg">
                <strong>Payload Type:</strong> {payloadData.type}
              </Text>
              <Text size="lg">
                <strong>Orbit:</strong> {payloadData.orbit}
              </Text>
            </>
          )}
          <Text size="lg">
            <strong>Rocket:</strong>{' '}
            <Link
              to={`/rockets/${launchData?.rocket}`}
              style={{ textDecoration: 'none', color: '#1c7ed6' }}
            >
              View Rocket Details
            </Link>
          </Text>
          <Text size="lg">
            <strong>Details:</strong> {launchData?.details || 'No details available'}
          </Text>
        </Stack>

        <Divider mt="lg" mb="lg" />

        <Accordion>
          <Accordion.Item value="links">
            <Accordion.Control>External Links</Accordion.Control>
            <Accordion.Panel>
              {launchData?.links?.webcast && (
                <Text>
                  <a
                    href={launchData.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1c7ed6' }}
                  >
                    YouTube Webcast
                  </a>
                </Text>
              )}
              {launchData?.links?.wikipedia && (
                <Text>
                  <a
                    href={launchData.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1c7ed6' }}
                  >
                    Wikipedia
                  </a>
                </Text>
              )}
              {launchData?.links?.article && (
                <Text>
                  <a
                    href={launchData.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1c7ed6' }}
                  >
                    Article
                  </a>
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Group position="center" mt="xl">
          <Button variant="outline" color="blue" size="md">
            <Link to="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
              Back to List
            </Link>
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default ResourceDetail;
