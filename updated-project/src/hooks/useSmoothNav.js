import { useEffect } from 'react';

/**
 * Smooth-scrolls anchor links and highlights the active nav link
 * based on which section is currently in view.
 */
export function useSmoothNav() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', onClick);

    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    let navIo;

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
      const setActive = (id) => {
        navAnchors.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      };
      navIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      sections.forEach((s) => navIo.observe(s));
    }

    return () => {
      document.removeEventListener('click', onClick);
      if (navIo) navIo.disconnect();
    };
  }, []);
}
