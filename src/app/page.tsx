import React from "react";
import { Box } from "@mui/material";
import {
  SignInButton,
  SignedOut,
} from "@clerk/nextjs";
import './globals.css'
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard"); // Redirect unauthenticated users
  }
  return (
    <>
      <Box id="showcase">
        <h1>Welcome To Userlytics</h1>
     
      <Box id="content" className="container">
    Built using React, Next, TypeScript, React Spring and Material UI. This app provides users with an interactive and dynamic experience, featuring various components such as a Counter, a User Data Form, and Rich Text Editors. The app also offers additional features like User Authentication using Clerk and Dashboard Visualization using react charts for enhanced functionality.

</Box>



      <Box display="flex" justifyContent="center" className="landing-btn">
        <SignedOut>
          <SignInButton


          >
            Sign In
          </SignInButton>
        </SignedOut>

      </Box>
      </Box>

    </>
  );
}
