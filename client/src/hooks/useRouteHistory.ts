import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePreviousRoute = () => {
  const { asPath } = useRouter();
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const sessionHistory = sessionStorage.getItem("history");
      return sessionHistory ? JSON.parse(sessionHistory) : [asPath];
    } else {
      return [asPath];
    }
  });
  const lastHistoryIndex = history.length - 2;
  const previousRoute = history[lastHistoryIndex > 0 ? lastHistoryIndex : 0];

  const removeHistory = () => {
    setHistory((prevHistory) =>
      prevHistory.length > 1
        ? prevHistory.filter((_, index) => index !== prevHistory.length - 1)
        : prevHistory
    );
  };

  useEffect(() => {
    if (asPath.includes("/movie/") && typeof window !== "undefined") {
      setHistory((prevHistory) => {
        const newHistory =
          prevHistory[prevHistory.length - 1] !== asPath
            ? [...prevHistory, asPath]
            : prevHistory;
        sessionStorage.setItem("history", JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [asPath]);

  return { history, previousRoute, removeHistory };
};
