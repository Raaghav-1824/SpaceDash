export const fetchApiData = async (endpoint: string, id?: string) => {
  const url = id
    ? `https://api.spacexdata.com/v4/${endpoint}/${id}` // Fetch details of a specific item by ID
    : `https://api.spacexdata.com/v4/${endpoint}`; // Fetch list of items

  console.log("Fetching URL:", url); 

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
