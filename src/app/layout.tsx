import { AuthProvider } from "./shared/AuthContext";
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
        <main>
            <section>
                <div>
                    {children}
                </div>
            </section>
        </main>
    </AuthProvider>
    </body>
    </html>
  );
}
