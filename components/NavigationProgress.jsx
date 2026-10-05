"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";

export default function NavigationProgress() {
  const pathname = usePathname();
  const intl = useIntl();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigation = useRef({ active: false, started: 0, path: null });
  const timers = useRef({ tick: null, finish: null, hide: null, fallback: null });

  useEffect(() => {
    const clearTimers = () => {
      Object.values(timers.current).forEach(clearTimeout);
      clearInterval(timers.current.tick);
    };
    const start = () => {
      clearTimers();
      navigation.current = { active: true, started: Date.now(), path: window.location.pathname };
      setProgress(12);
      setVisible(true);
      timers.current.tick = setInterval(() => {
        setProgress(value => Math.min(90, value + (90 - value) * 0.12));
      }, 250);
      // Clear the indicator if navigation is cancelled or fails before committing.
      timers.current.fallback = setTimeout(() => {
        clearTimers();
        navigation.current.active = false;
        setVisible(false);
      }, 15000);
    };
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname || /\.[a-z0-9]+$/i.test(destination.pathname) || destination.pathname.startsWith("/api/")) return;
      start();
    };
    const onPopState = () => {
      if (navigation.current.path !== window.location.pathname) start();
    };
    navigation.current.path = window.location.pathname;
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      clearTimers();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    navigation.current.path = pathname;
    if (!navigation.current.active) return;
    clearInterval(timers.current.tick);
    clearTimeout(timers.current.fallback);
    timers.current.finish = setTimeout(() => {
      setProgress(100);
      timers.current.hide = setTimeout(() => {
        navigation.current.active = false;
        setVisible(false);
      }, 220);
    }, Math.max(0, 180 - (Date.now() - navigation.current.started)));
  }, [pathname]);

  return (
    <div className={`navigation-progress${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <div className="navigation-progress-bar" style={{ transform: `scaleX(${progress / 100})` }} />
      <span className="sr-only" role="status" aria-live="polite">
        {visible ? intl.formatMessage({ id: "navigation.loading" }) : ""}
      </span>
    </div>
  );
}
