"use client";

import { useEffect, useState } from "react";

import { strings } from "@content/strings";

import { whatsappUrl } from "@/lib/site";

/**
 * Sticky mobil-CTA på money pages (plan.md §3C).
 *
 * Visas först efter att besökaren scrollat förbi heron, så att den inte
 * konkurrerar med sidans huvudlöfte direkt vid landning.
 */
export function StickyMobileCta({
  label = strings.cta.stickyLabel,
  action = strings.cta.stickyAction,
  message,
}: {
  label?: string;
  action?: string;
  message?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-forest-700 bg-forest-900/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-sand-200">{label}</p>
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="shrink-0 rounded-md bg-clay-500 px-4 py-2.5 text-[0.9375rem] font-medium text-white"
        >
          {action}
        </a>
      </div>
    </div>
  );
}
