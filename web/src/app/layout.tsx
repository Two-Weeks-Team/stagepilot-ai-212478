import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "StagePilot AI",
  description: "AI\u2011driven cockpit that turns any live event into a flawless production, from script to check\u2011in to post\u2011show insights.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
