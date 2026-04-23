import Link from "next/link";
import { SITE_CONFIG } from "@/content/config";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-surface/80">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 text-center sm:px-6 sm:pb-28 lg:px-8">
        <p className="font-medium text-foreground-secondary">MOMENTS | AI-empowered context in a governance sandbox</p>
        <nav className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/" className="text-foreground-secondary hover:text-classic-blue">
            Home
          </Link>
          <Link href="/about" className="text-foreground-secondary hover:text-classic-blue">
            About
          </Link>
          <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-classic-blue">
            GitHub
          </a>
          <a href={SITE_CONFIG.discussionsUrl} target="_blank" rel="noopener noreferrer" className="text-foreground-secondary hover:text-classic-blue">
            Discussions
          </a>
        </nav>
      </div>
    </footer>
  );
}
