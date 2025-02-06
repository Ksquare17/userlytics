"use client"
import {
  ClerkProvider,

} from '@clerk/nextjs'
import './globals.css'
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ReduxProvider from "./store/Provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        
        <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}