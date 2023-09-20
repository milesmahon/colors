import "./globals.css";
import { Space_Mono } from "next/font/google";

const space_mono = Space_Mono({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chromexto",
  description: "Guess the color.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={space_mono.className}>{children}</body>
    </html>
  );
}
