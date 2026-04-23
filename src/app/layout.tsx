import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { LiquidGlassNav } from "@/components/LiquidGlassNav";
import { Footer } from "@/components/Footer";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Moments",
    template: "%s | Moments",
  },
  description:
    "GitHub-native civil governance sandbox for sharing visions beyond poverty, unemployment, misinformation, and ecological degradation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: "body{font-family:var(--font-nunito),-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}",
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}>
        <ThemeProvider>
          <div className="blob-container">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>

          <header className="glass-nav-shell fixed inset-x-0 bottom-3 z-40 flex justify-center px-3">
            <LiquidGlassNav className="w-full max-w-3xl p-0">
              <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-5">
                <Link href="/" className="inline-flex items-center text-lg font-bold leading-none text-foreground">
                  Moments
                </Link>

                <nav className="flex items-center gap-1 sm:gap-1.5">
                  <Link href="/" className="nav-link text-sm font-bold text-foreground-secondary hover:text-classic-blue">
                    Home
                  </Link>
                  <Link href="/about" className="nav-link text-sm font-bold text-foreground-secondary hover:text-classic-blue">
                    About
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </LiquidGlassNav>
          </header>

          <div className="page-body">
            <main className="mx-auto max-w-5xl px-4 py-10 pb-14 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
