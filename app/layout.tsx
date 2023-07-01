import { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb lite clone",
  description: "Airbnb lite clone with cloudinary, next.js13 and more...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <RegisterModal isOpen title="Hello World" actionLabel="Submit" />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
