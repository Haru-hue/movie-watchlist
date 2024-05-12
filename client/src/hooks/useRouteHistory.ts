import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useNavigationTracker = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Save the navigation history in the session storage
      const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]') || [];
      navigationHistory.push(url);
      sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
}
