"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SITE_CONFIG } from "@/content/config";

function getGiscusThemeUrl(theme: "light" | "dark") {
  if (typeof window === "undefined") return "";

  const configuredBasePath = (() => {
    try {
      const pathname = new URL(SITE_CONFIG.siteUrl).pathname.replace(/\/$/, "");
      return window.location.hostname === "localhost" ? "" : pathname;
    } catch {
      return "";
    }
  })();

  return `${window.location.origin}${configuredBasePath}/giscus/${theme}.css`;
}

export function GiscusComments({ discussionNumber }: { discussionNumber: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { actualTheme } = useTheme();
  const term = `/moment/${discussionNumber}`;

  useEffect(() => {
    if (!containerRef.current || !SITE_CONFIG.repoId || !SITE_CONFIG.discussionCategoryId) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", `${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}`);
    script.setAttribute("data-repo-id", SITE_CONFIG.repoId);
    script.setAttribute("data-category", SITE_CONFIG.discussionCategoryName);
    script.setAttribute("data-category-id", SITE_CONFIG.discussionCategoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", getGiscusThemeUrl(actualTheme === "dark" ? "dark" : "light"));
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [actualTheme, discussionNumber, term]);

  if (!SITE_CONFIG.repoId || !SITE_CONFIG.discussionCategoryId) {
    return (
      <div className="glass-card-inner rounded-xl p-4 text-sm text-foreground-secondary">
        Add `repoId` and `discussionCategoryId` in `src/content/config.ts` to enable Giscus comments.
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[2rem] border border-border/40 bg-surface-elevated/30 p-2 shadow-2xl backdrop-blur-xl">
      <div ref={containerRef} />
    </div>
  );
}
