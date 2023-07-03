import { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import RegisterModal from "./components/modals/RegisterModal";

import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getSession";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb lite clone",
  description: "Airbnb lite clone with cloudinary, next.js13 and more...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider  />
        <RegisterModal isOpen title="Hello World" actionLabel="Submit" />
        <LoginModal isOpen title="Hello World" actionLabel="Submit" />
        <NavBar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
