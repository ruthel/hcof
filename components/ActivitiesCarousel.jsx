"use client";

import { Children, useEffect, useId, useRef, useState } from "react";

export default function ActivitiesCarousel({ children, t }) {
  const items = Children.toArray(children).slice(0, 5);
  const track = useRef(null);
  const trackId = useId();
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(3);
  const lastPosition = Math.max(0, items.length - visible);

  useEffect(() => {
    const element = track.current;
    function measure() {
      const firstCard = element.firstElementChild;
      if (!firstCard) return;
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const count = Math.max(1, Math.round((element.clientWidth + gap) / step));
      setVisible(count);
      setPosition(Math.min(Math.max(0, items.length - count), Math.round(element.scrollLeft / step)));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { observer.disconnect(); element.removeEventListener("scroll", measure); };
  }, [items.length]);

  function goTo(index) {
    const element = track.current;
    const card = element.children[index];
    if (!card) return;
    element.scrollTo({ left: card.offsetLeft - element.firstElementChild.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div className="activities-carousel" role="region" aria-roledescription={t("activities.carousel.type")} aria-label={t("nav.what")}>
      <div id={trackId} ref={track} className="activities-track" tabIndex={0} aria-label={t("activities.carousel.browse")}>
        {items}
      </div>
      <div className="activities-controls">
        <button type="button" aria-controls={trackId} aria-label={t("activities.carousel.previous")} disabled={position === 0} onClick={() => goTo(position - 1)}>←</button>
        <div className="activities-dots" role="group" aria-label={t("activities.carousel.positions")}>
          {Array.from({ length: lastPosition + 1 }, (_, index) => (
            <button key={index} type="button" aria-controls={trackId} aria-label={`${t("activities.carousel.position")} ${index + 1}`} aria-current={position === index ? "true" : undefined} onClick={() => goTo(index)} />
          ))}
        </div>
        <button type="button" aria-controls={trackId} aria-label={t("activities.carousel.next")} disabled={position === lastPosition} onClick={() => goTo(position + 1)}>→</button>
      </div>
    </div>
  );
}
