import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref, isVisible };
}

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDir, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDir);
  }, []);

  return { scrollDir, scrollY };
}
