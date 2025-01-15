import React, { useState, useEffect } from "react";
import {
  Table,
  Text,
  TextInput,
  ScrollArea,
  Button,
  Pagination,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface TableProps<T> {
  data: T[];
  columns: { key: string; label: string }[];
  onRowClick: (payload: T) => void;
  detailLinkPrefix: string; // Used to generate detail page link
  withPagination?: boolean; // Make sure this is optional
}

const ReusableTable = <T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  detailLinkPrefix,
  withPagination = false,
}: TableProps<T>) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const searchedData = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(searchedData);
  }, [search, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Pagination: Slice the data based on current page and items per page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        style={{ width: "100%", minWidth: "700px" }}
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
            <th>Actions</th> {/* Added a column for actions (Detail button) */}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={String(row.id)} // Ensure the key is unique and always a string
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #f2f2f2",
              }}
              onClick={() => onRowClick(row)}
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
                  {row[key as keyof T] !== undefined
                    ? String(row[key as keyof T])
                    : "-"}
                </td>
              ))}
              <td style={{ padding: "12px 16px" }}>
                {/* Detail Button */}
                <Link to={`${detailLinkPrefix}/${row.id}`}>
                  <Button variant="outline" size="xs">
                    Detail
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {withPagination && (
        <Pagination
          value={currentPage} // Use 'value' instead of 'page'
          onChange={handlePageChange}
          total={Math.ceil(filteredData.length / itemsPerPage)}
          style={{
            marginTop: "20px",
            textAlign: "center", 
            justifyContent: "center", 
          }}
          size="sm" 
          styles={(theme) => ({
            control: {
              fontSize: "12px", 
              height: "30px", 
              padding: "0 8px", 
            },
            item: {
              border: "none", 
              backgroundColor: "transparent", 
              color: theme.colors.gray[7],
              "&[data-active]": {
                backgroundColor: theme.colors.blue[6],
                color: "white", 
              },
            },
          })}
        />
      )}
    </ScrollArea>
  );
};

export default ReusableTable;
