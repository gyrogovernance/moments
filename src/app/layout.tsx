import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import Link from "next/link";
import { SITE_CONFIG } from "@/content/config";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { LiquidGlassNav } from "@/components/LiquidGlassNav";
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
    "Share your vision of life beyond poverty, unemployment, misinformation, and ecological degradation.",
};

function TabItem({
  href,
  icon,
  label,
  target,
}: {
  href: string;
  icon: string;
  label: string;
  target?: "_blank";
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="tab-item text-foreground-secondary hover:text-foreground"
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {icon}
      </span>
      <span className="text-[11px] font-semibold leading-none">{label}</span>
    </Link>
  );
}

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
            <LiquidGlassNav className="w-full max-w-xl p-0">
              <div className="flex h-14 items-center justify-around px-2">
                <TabItem href="/" icon="🏠" label="Moments" />
                <TabItem href="/explore" icon="🌐" label="Explore" />
                <TabItem href="/about" icon="ℹ️" label="About" />
                <TabItem href={SITE_CONFIG.createMomentUrl} target="_blank" icon="✏️" label="Create" />
                <div className="tab-item text-foreground-secondary">
                  <ThemeToggle />
                  <span className="text-[11px] font-semibold leading-none">Theme</span>
                </div>
              </div>
            </LiquidGlassNav>
          </header>

          <div className="page-body">
            <main className="mx-auto max-w-3xl px-4 pt-6 pb-20 sm:px-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
