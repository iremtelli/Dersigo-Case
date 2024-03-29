import React from "react"
import { Toaster } from "react-hot-toast"
import Header from "../components/Header"
import "./globals.css"
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <Header />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
