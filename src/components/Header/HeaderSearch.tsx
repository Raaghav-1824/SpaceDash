import { IconSearch } from "@tabler/icons-react";
import { Autocomplete, Burger, Flex, Group } from "@mantine/core";
import { Link } from "react-router-dom";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function HeaderSearch({
  toggleNavbar,
  isNavbarOpen,
}: {
  toggleNavbar: () => void;
  isNavbarOpen: boolean;
}) {
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      style={{
        textDecoration: "none",
        color: "#333",
        padding: "8px 12px",
        borderRadius: "6px",
        transition: "background-color 0.3s ease",
      }}
      onClick={() => toggleNavbar()}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#f5f7fa",
        padding: "10px 20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
      }}
    >
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Burger
          opened={isNavbarOpen} // Initially open
          onClick={toggleNavbar}
          size="sm"
          style={{ color: "#1a73e8", cursor: "pointer" }}
        />
        <Link to="/" style={{ flex: 1, textAlign: "center" }}>
          <img
            src="/assets/SpaceX_Logo_Black.png"
            alt="Project Logo"
            width={100}
            height={25}
            style={{
              cursor: "pointer",
              display: "block",
              marginLeft: "8px", // Adjust to move logo closer to the burger
            }}
          />
        </Link>
      </Group>

      <Group>
        <Group
          spacing={10}
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {items}
        </Group>
        <Autocomplete
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={[
            "Launches",
            "Payloads",
            "Rockets",
            "SpaceX History",
            "Upcoming Missions",
          ]}
          style={{
            width: 200,
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "8px",
          }}
        />
      </Group>
    </header>
  );
}
