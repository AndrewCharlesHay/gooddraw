import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good Draw — Political Donations for Charity",
  description:
    "Donate to your candidate. Cancel out the opposition. The matched amount goes to charity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Good Draw
            </Link>
            <span className="text-sm text-gray-500 hidden sm:block">
              Where political opposites cancel out — for good.
            </span>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-16 py-6 text-center text-sm text-gray-400">
          Charity partner: St. Jude Children's Research Hospital &middot; Contributions are not tax-deductible.
        </footer>
      </body>
    </html>
  );
}
