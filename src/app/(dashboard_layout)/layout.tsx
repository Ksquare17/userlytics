"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./layout/sidebar/Sidebar";
import Header from "./layout/header/Header";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className="mainwrapper">
    
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
   
      <PageWrapper className="page-wrapper">
      <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
     
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
         
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
       
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
