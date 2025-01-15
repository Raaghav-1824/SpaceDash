import React from "react";
import { Box } from "@mantine/core";
import { HeaderSearch } from "../components/Header/HeaderSearch";
import { NavbarNested } from "../components/Navbar/NavbarNested";
import { Outlet } from "react-router-dom";

export function MainLayout({ isNavbarOpen, toggleNavbar }: { isNavbarOpen: boolean; toggleNavbar: () => void }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000, 
          backgroundColor: "white", 
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderSearch toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
      </Box>

      {/* Fixed Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: "60px", // Adjust based on header height
          left: 0,
          bottom: 0,
          width: isNavbarOpen ? "15%" : "0", // Adjust width based on navbar toggle state
          transition: "width 0.3s ease", // Smooth transition when toggling
          zIndex: 999, // Ensure it's below the header
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional shadow
        }}
      >
        {isNavbarOpen && <NavbarNested isOpen={isNavbarOpen} />}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          marginTop: "60px", // To prevent content from hiding behind the fixed header
          // marginLeft: isNavbarOpen ? "20%" : 0, // Adjust the content margin based on navbar state
          transition: "margin-left 0.3s ease", // Smooth transition when toggling navbar
          padding: "20px",
          paddingLeft: isNavbarOpen ? "15%" : 0, // Adjust padding to avoid overlap with navbar
          overflowY: "auto", // Enable scroll for the content
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
