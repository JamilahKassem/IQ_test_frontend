import { AuthProvider } from "./shared/AuthContext";
import { Template } from "./shared/template";
import "./css/theme.css";
import React from "react";

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
    <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <title>IQ Test</title>
    </head>
    <body>
    <AuthProvider>
        <Template>
            {children}
        </Template>
    </AuthProvider>
    </body>
    </html>
  );
}
