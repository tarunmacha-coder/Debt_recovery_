import { useEffect } from 'react';

/**
 * Adds the `.in` class to every `.reveal` element when it enters the viewport.
 * Mirrors the original IntersectionObserver behaviour from the reference HTML.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
