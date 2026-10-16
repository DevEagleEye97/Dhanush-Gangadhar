import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { portfolioConfig } from "@/config/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${portfolioConfig.displayName} — Personal Digital Headquarters`,
    template: `%s | ${portfolioConfig.displayName}`,
  },
  description: `${portfolioConfig.professionalHeadline}. Engineering student focused on computer networking, Linux systems, cybersecurity research, and software tools.`,
  keywords: [
    portfolioConfig.displayName,
    "Dhanush Gangadhar",
    "Computer Science Engineering",
    "Cybersecurity",
    "Cybersecurity Learning Hub",
    "Linux Systems",
    "Networking",
    "TCP/IP",
    "Software Engineering",
    "Velora",
  ],
  authors: [{ name: portfolioConfig.displayName }],
  creator: portfolioConfig.displayName,
  metadataBase: (portfolioConfig.domain || portfolioConfig.existingPortfolioUrl) ? new URL(portfolioConfig.domain || portfolioConfig.existingPortfolioUrl!) : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioConfig.domain || portfolioConfig.existingPortfolioUrl || undefined,
    title: `${portfolioConfig.displayName} — Personal Portfolio & Cybersecurity Hub`,
    description: portfolioConfig.heroSupportingCopy,
    siteName: `${portfolioConfig.displayName}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101210" },
    { media: "(prefers-color-scheme: light)", color: "#F7F8F4" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-bg-main text-text-primary antialiased selection:bg-accent/20 selection:text-text-primary">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
