import React, { useState, useEffect } from "react";
import { Table, Text, TextInput, ScrollArea, Button } from "@mantine/core";
import { Link } from "react-router-dom";

// Define prop interface
interface TableProps<T> {
  data: T[];
  columns: { key: string; label: string }[];
  onRowClick: (payload: T) => void;
  detailLinkPrefix: string; // Add detailLinkPrefix here
}

// Update T to allow dynamic property access
const ReusableTable = <T extends { id: string | number; [key: string]: any }>({
  data,
  columns,
  onRowClick,
  detailLinkPrefix,
}: TableProps<T>) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.toLowerCase();
    setSearch(query);

    const searchedData = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
    setFilteredData(searchedData);
  };

  return (
    <ScrollArea style={{ maxWidth: "100%" }}>
      <TextInput
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        mb="md"
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
      <Table
        striped
        highlightOnHover
        style={{
          width: "100%",
          minWidth: "700px",
        }}
      >
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                <Text>{label}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr
              key={row.id}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
              }}
              onClick={() => {
                if (onRowClick) onRowClick(row);
                console.log("Row clicked:", row);
              }}
            >
              {columns.map(({ key }) => (
                <td
                  key={key}
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  {String(row[key])}
                </td>
              ))}
              <td style={{ textAlign: "center" }}>
                <Link to={`${detailLinkPrefix}/${row.id}`}>
                  <Button
                    variant="light"
                    size="xs"
                    color="blue"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                    onClick={(e) => {
                      console.log("Button clicked, navigating to:", `${detailLinkPrefix}/${row.id}`);
                    }}
                  >
                    Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default ReusableTable;
