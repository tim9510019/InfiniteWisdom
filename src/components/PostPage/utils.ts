// react
import { useEffect, useRef, useState } from "react";
// type
import type { MarkdownHeading } from "astro";

export type TocItem = MarkdownHeading & {
  subheadings: TocItem[];
};

export function buildToc(headings: MarkdownHeading[]) {
  const toc: TocItem[] = [];
  const parentHeadings = new Map<number, TocItem>();
  headings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 1) {
      toc.push(heading);
    } else {
      const parent = parentHeadings.get(heading.depth - 1);
      if (parent) {
        parent.subheadings.push(heading);
      }
    }
  });
  return toc;
}

export function useScrollDirection() {
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // 忽略超過內容範圍的彈性滾動
      if (currentScrollY < 0 || currentScrollY > scrollHeight - windowHeight) {
        return;
      }

      setIsScrollDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isScrollDown;
}

export function useHeadingObserver(isScrollDown: boolean) {
  const [intersectHeadingId, setIntersectHeadingId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3"
    );
    const firstHeadingId = headings[0]?.id;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          setIntersectHeadingId(target.id);
        } else {
          if (target.id === firstHeadingId && !isScrollDown) {
            setIntersectHeadingId("");
          }
        }
      });
    };

    // Search Range setting -80% ~ -85%
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -85% 0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    headings.forEach((heading) => observer.observe(heading));
    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      observer.disconnect();
    };
  }, [isScrollDown]);

  return intersectHeadingId;
}

export default useHeadingObserver;
