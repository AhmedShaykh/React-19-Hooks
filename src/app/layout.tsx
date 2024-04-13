import { Provider } from "@/Components/Provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Email & Embla Carousel",
  description: "React Email & Embla Carousel"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Provider>
      </body>
    </html>
  )
};