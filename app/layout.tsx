import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dr. Squatch Wilderness Rewards",
  description: "Earn rewards as wild as you are. Natural soap for natural men.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  )
}
