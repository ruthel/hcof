"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ContentContext = createContext({ activities: [], news: [] });
export const useContent = () => useContext(ContentContext);
export default function ContentProvider({ children, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content", { cache: "no-store", signal: controller.signal }).then(async (response) => {
      if (!response.ok) return;
      const value = await response.json();
      if (Array.isArray(value.activities) && Array.isArray(value.news)) setContent(value);
    }).catch(() => {});
    return () => controller.abort();
  }, [pathname]);
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
