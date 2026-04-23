"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SITE_CONFIG } from "@/content/config";

export function GiscusComments({ discussionNumber }: { discussionNumber: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !SITE_CONFIG.repoId || !SITE_CONFIG.discussionCategoryId) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", `${SITE_CONFIG.repoOwner}/${SITE_CONFIG.repoName}`);
    script.setAttribute("data-repo-id", SITE_CONFIG.repoId);
    script.setAttribute("data-category", SITE_CONFIG.discussionCategoryName);
    script.setAttribute("data-category-id", SITE_CONFIG.discussionCategoryId);
    script.setAttribute("data-mapping", "number");
    script.setAttribute("data-term", String(discussionNumber));
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", actualTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [actualTheme, discussionNumber]);

  if (!SITE_CONFIG.repoId || !SITE_CONFIG.discussionCategoryId) {
    return (
      <div className="glass-card-inner rounded-xl p-4 text-sm text-foreground-secondary">
        Add `repoId` and `discussionCategoryId` in `src/content/config.ts` to enable Giscus comments.
      </div>
    );
  }

  return <div ref={containerRef} className="mt-8" />;
}
