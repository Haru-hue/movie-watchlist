'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RouteChangeListener() {
  const pathname = usePathname();
  const moviePages = pathname.includes('/movie');

  useEffect(() => {
    if (moviePages) {
      const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
      if (!navigationHistory.includes(pathname)) {
        navigationHistory.push(pathname);
        sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
      }
    }
  }, [pathname]);

  return <></>;
}
