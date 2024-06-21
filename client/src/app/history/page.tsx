import { RecentlyViewed } from "@/page.components/history/recentlyView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "History - The Movie Watch List",
  description: "Powered by TMDB API",
};

const HistoryPage = () => {
  return <RecentlyViewed  />;
};

export default HistoryPage;
