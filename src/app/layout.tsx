import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrpcProvider } from "@/trpc/TrpcProvider";
import ThemeRegistry from "./ThemeRegistry";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          <TrpcProvider>
            <Box component="section" sx={{ p: 2, width: 600, margin: "auto" }}>
              {children}
            </Box>
          </TrpcProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
